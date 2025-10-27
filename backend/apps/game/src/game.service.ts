import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, CreateGameDto } from 'libs/common/src';

@Injectable()
export class GameService {
  constructor(
    /**
     * Injecting gameRepo
     */
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
  ) {}
  public async addGame(createGameDto: CreateGameDto) {
    try {
      const game = this.gameRepo.create(createGameDto);

      const newGame = await this.gameRepo.save(game);

      return new ApiResponse(true, 'Game Created Successfully', { newGame });
    } catch (error) {
      console.log(error);
    }
  }
}
