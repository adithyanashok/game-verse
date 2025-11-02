import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, CreateGameDto, EditGameDto } from 'libs/common/src';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GameService {
  constructor(
    /**
     * Injecting gameRepo
     */
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,

    private readonly configService: ConfigService,
  ) {}

  // Create Game
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

  // Get Game
  public async getGame(id: number) {
    try {
      const game = await this.gameRepo.findOneBy({ id });

      if (!game) {
        throw new RpcException({
          status: 404,
          message: 'Game not found',
        });
      }

      return new ApiResponse(true, 'Game Fetched Successfully', {
        game,
      });
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
        throw new RpcException({
          status: 404,
          message: 'Game not found',
        });
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
      throw error;
    }
  }

  public async deleteGame(id: number) {
    try {
      const game = await this.gameRepo.findOneBy({ id });

      if (!game) {
        throw new RpcException({
          status: 404,
          message: 'Game not found',
        });
      }

      await this.gameRepo.delete({ id });

      return new ApiResponse(true, 'Game Deleted Successfully', {
        game,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Find One
  public async findOne(id: number) {
    console.log(id);
    const game = await this.gameRepo.findOneBy({ id });

    console.log(game);
    return game;
  }
}
