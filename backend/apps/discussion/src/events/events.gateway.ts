import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-jwt.guard';
import { DiscussionService } from '../discussion.service';

interface UserPayload {
  id: number;
  name?: string;
}

interface AuthenticatedSocket extends Socket {
  user: UserPayload;
  discussionId?: number;
}

@WebSocketGateway({ cors: { origin: '*' } })
@UseGuards(WsAuthGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => DiscussionService))
    private readonly discussionService: DiscussionService,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }
  async handleDisconnect(client: AuthenticatedSocket) {
    console.log('Client disconnected', client.id);
    const discussionId = client.discussionId;
    if (!discussionId) return;
    const sockets = await this.server
      .in(`discussion-${discussionId}`)
      .fetchSockets();

    this.server.to(`discussion-${discussionId}`).emit('disconnects', {
      userId: client.user.id,
      message: `${client.user.name || client.user.id}`,
      totalMembers: sockets.length,
    });
    await this.discussionService.updateCount(discussionId, sockets.length);
  }

  @SubscribeMessage('joinDiscussion')
  async handleJoinDiscussion(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    payload: { discussionId: number; userId: number; name: string },
  ) {
    const user = client.user;
    const { discussionId } = payload;

    console.log(`User ${user?.id} joining discussion ${discussionId}`);

    const isBlocked = await this.discussionService.isUserBlocked(
      discussionId,
      user.id,
    );

    if (isBlocked) {
      client.emit('error', 'You are blocked from this discussion');
      client.disconnect();
      return;
    }

    client.discussionId = discussionId;
    const sockets = await this.server
      .in(`discussion-${discussionId}`)
      .fetchSockets();
    console.log('sockets ', sockets.length);
    await client.join(`discussion-${discussionId}`);
    this.server.to(`discussion-${discussionId}`).emit('userJoined', {
      userId: payload.userId,
      message: `${payload.name || payload.userId} joined`,
      totalMembers: sockets.length + 1,
    });

    await this.discussionService.updateCount(discussionId, sockets.length + 1);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    payload: { discussionId: number; content: string; username: string },
  ) {
    const user = client.user;
    user.name = payload.username;
    const { discussionId, content, username } = payload;

    console.log(
      `User ${user?.id} sending message to ${discussionId}: ${content}`,
    );
    const savedMessage = await this.discussionService.saveMessage(
      discussionId,
      user.id,
      content,
    );

    this.server.to(`discussion-${discussionId}`).emit('newMessage', {
      ...savedMessage,
      sender: { id: user.id, name: username },
    });
  }

  @SubscribeMessage('kickUser')
  async handleKickUser(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { discussionId: number; userIdToKick: number },
  ) {
    const user = client.user;
    const { discussionId, userIdToKick } = payload;

    const discussion = await this.discussionService.getDiscussion(discussionId);

    if (!discussion || !discussion.data) {
      client.emit('error', 'Discussion not found');
      return;
    }

    if (discussion.data.adminId !== user.id) {
      client.emit('error', 'Only admin can kick users');
      return;
    }

    const sockets = await this.server
      .in(`discussion-${discussionId}`)
      .fetchSockets();
    const socketToKick = sockets.find(
      (s) => (s as unknown as AuthenticatedSocket).user?.id === userIdToKick,
    );

    if (socketToKick) {
      socketToKick.emit('kicked', 'You have been kicked from the discussion');
      socketToKick.leave(`discussion-${discussionId}`);
      this.server.to(`discussion-${discussionId}`).emit('userKicked', {
        userId: userIdToKick,
        kickedBy: user.id,
      });
    }
  }

  @SubscribeMessage('blockUser')
  async handleBlockUser(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { discussionId: number; userIdToBlock: number },
  ) {
    const user = client.user;
    const { discussionId, userIdToBlock } = payload;

    try {
      await this.discussionService.blockUser(
        discussionId,
        userIdToBlock,
        user.id,
      );

      const sockets = await this.server
        .in(`discussion-${discussionId}`)
        .fetchSockets();
      const socketToKick = sockets.find(
        (s) => (s as unknown as AuthenticatedSocket).user?.id === userIdToBlock,
      );

      if (socketToKick) {
        socketToKick.emit(
          'blocked',
          'You have been blocked from the discussion',
        );
        socketToKick.disconnect(true);
      }

      this.server.to(`discussion-${discussionId}`).emit('userBlocked', {
        userId: userIdToBlock,
        blockedBy: user.id,
      });
    } catch (error) {
      client.emit('error', (error as Error).message);
    }
  }

  @SubscribeMessage('endDiscussion')
  async handleEndDiscussion(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { discussionId: number; adminId: number },
  ) {
    const user = client.user;
    const { discussionId, adminId } = payload;

    if (user.id !== adminId) {
      client.emit('error', 'Only admin can end the discussion');
      return;
    }

    const discussion = await this.discussionService.getDiscussion(discussionId);

    if (!discussion || !discussion.data) {
      client.emit('error', 'Discussion not found');
      return;
    }
    this.server.to(`discussion-${discussionId}`).emit('discussionEnded', {
      discussionId,
    });
    await this.discussionService.endDiscussion(discussionId);

    const sockets = await this.server
      .in(`discussion-${discussionId}`)
      .fetchSockets();

    sockets.forEach((socket) => {
      socket.leave(`discussion-${discussionId}`);
    });
  }
}
