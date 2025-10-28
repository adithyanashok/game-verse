import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, CreateGameDto, EditGameDto } from 'libs/common/src';

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
      throw error;
    }
  }

  // Edit Game
  public async editGame(editGameDto: EditGameDto) {
    try {
      const game = await this.gameRepo.findOneBy({ id: editGameDto.id });

      if (!game) {
        throw new NotFoundException('Game not found');
      }
      game.name = editGameDto.name ?? game.name;
      game.description = editGameDto.description ?? game.description;
      game.imgUrl = editGameDto.imgUrl ?? game.imgUrl;

      const updatedGame = await this.gameRepo.save(game);

      return new ApiResponse(true, 'Game Edited Successfully', {
        updatedGame,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
