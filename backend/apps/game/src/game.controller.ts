import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateGameDto, EditGameDto, MessagePatterns } from 'libs/common/src';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern(MessagePatterns.GAME_CREATE)
  public async addGame(@Payload() payload: CreateGameDto) {
    return await this.gameService.addGame(payload);
  }

  @MessagePattern(MessagePatterns.GAME_UPDATE)
  public async editGame(@Payload() payload: EditGameDto) {
    return await this.gameService.editGame(payload);
  }

  @MessagePattern(MessagePatterns.GAME_DELETE)
  public async deleteGame(@Payload() payload: number) {
    return await this.gameService.deleteGame(payload);
  }

  @MessagePattern(MessagePatterns.GAME_GET)
  public async getGame(@Payload() payload: number) {
    return await this.gameService.getGame(payload);
  }
}
