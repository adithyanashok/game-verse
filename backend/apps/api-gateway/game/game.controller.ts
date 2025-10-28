import {
  Body,
  Controller,
  Delete,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiResponse as Api,
  CreateGameDto,
  EditGameDto,
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

  @ApiOperation({
    summary: 'Api for creating new Game',
  })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
  })
  @Post('create-game')
  public async createGame(
    @Body() createGameDto: CreateGameDto,
  ): Promise<Api<CreateGameDto>> {
    return firstValueFrom(
      this.gameClient.send(MessagePatterns.GAME_CREATE, createGameDto),
    );
  }

  @ApiOperation({
    summary: 'Api for updating Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game updated successfully',
  })
  @Patch('edit-game')
  public async editGame(
    @Body() editGameDto: EditGameDto,
  ): Promise<Api<EditGameDto>> {
    return firstValueFrom(
      this.gameClient.send(MessagePatterns.GAME_UPDATE, editGameDto),
    );
  }

  @ApiOperation({
    summary: 'Api for deleting Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game Deleted successfully',
  })
  @Delete('delete-game')
  public async deleteGame(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<Api<CreateGameDto>> {
    return firstValueFrom(
      this.gameClient.send(MessagePatterns.GAME_DELETE, id),
    );
  }
}
