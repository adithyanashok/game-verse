import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiResponse,
  CreateGameDto,
  MessagePatterns,
  ServiceName,
} from 'libs/common/src';
import { firstValueFrom } from 'rxjs';

@ApiTags('games')
@Controller('game')
export class GameController {
  constructor(
    /**
     * Injecting GAME_SERVICE
     */
    @Inject(ServiceName.GAME)
    private readonly gameClient: ClientProxy,
  ) {}

  @Post('create-game')
  public async createGame(
    @Body() createGameDto: CreateGameDto,
  ): Promise<ApiResponse<CreateGameDto>> {
    return firstValueFrom(
      this.gameClient.send(MessagePatterns.GAME_CREATE, createGameDto),
    );
  }
}
