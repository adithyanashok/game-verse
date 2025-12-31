import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateDiscussionDto,
  MessagePatterns,
  ServiceName,
} from 'libs/common/src';
import { RoleGuard } from '../src/guards/role.guard';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';
import { CurrentUser } from '../src/decorators/current-user.decorator';

@ApiBearerAuth()
@Controller('discussion')
export class DiscussionController {
  constructor(
    /**
     * Injecting GAME_SERVICE
     */
    @Inject(ServiceName.DISCUSSION)
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: 'Api for get discussion',
  })
  @ApiResponse({
    status: 201,
    description: 'Discussion Fetched Successfully',
  })
  @UseGuards(RoleGuard)
  @Get('get-discussion')
  public async getDiscussion(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<any> {
    console.log(id);
    try {
      return await firstValueFrom(
        this.client.send(MessagePatterns.GET_DISCUSSION, id),
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @ApiOperation({
    summary: 'Api for creating discussion',
  })
  @ApiResponse({
    status: 201,
    description: 'Discussion Created Successfully',
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create-discussion')
  public async createDiscussion(
    @Body() createDiscussionDto: CreateDiscussionDto,
    @CurrentUser() user: any,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.client.send(MessagePatterns.CREATE_DISCUSSION, {
          ...createDiscussionDto,
          userId: user.id,
        }),
      );
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({
    summary: 'Api for get discussions',
  })
  @ApiResponse({
    status: 201,
    description: 'Discussions Fetched Successfully',
  })
  @UseGuards(RoleGuard)
  @Get('get-discussions')
  public async getDiscussions(): Promise<any> {
    try {
      return await firstValueFrom(
        this.client.send(MessagePatterns.GET_ALL_DISCUSSION, {}),
      );
    } catch (error) {
      return error;
    }
  }
}
