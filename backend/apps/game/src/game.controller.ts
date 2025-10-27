import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateGameDto, MessagePatterns } from 'libs/common/src';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern(MessagePatterns.GAME_CREATE)
  public async addGame(@Payload() payload: CreateGameDto) {
    return await this.gameService.addGame(payload);
  }
}
