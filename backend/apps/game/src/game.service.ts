import { Inject, Injectable } from '@nestjs/common';
import { In, Repository, Like, FindOptionsWhere } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Cache } from 'cache-manager';

import {
  ApiResponse,
  CreateGameDto,
  EditGameDto,
  FetchGamesDto,
  MessagePatterns,
  ServiceName,
} from 'libs/common/src';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GenreService } from './genre/genre.service';
import { firstValueFrom } from 'rxjs';
import {
  OverallRating,
  RatingInterface,
  RatingItem,
} from './interfaces/rating.interfaces';
import { AiProvider } from './providers/ai.provider';
import { Content } from './providers/interface/content.interface';
import { Overview } from './entities/overview.entity';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GameService {
  constructor(
    /**
     * Injecting gameRepo
     */
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,

    /**
     * Injecting overviewRepo
     */
    @InjectRepository(Overview)
    private readonly overviewRepo: Repository<Overview>,

    /**
     * Injecting GenreService
     */
    private readonly genreService: GenreService,

    private readonly configService: ConfigService,

    private readonly aiProvider: AiProvider,

    @Inject(ServiceName.REVIEW)
    private readonly reviewClient: ClientProxy,

    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  // Create Game
  public async addGame(createGameDto: CreateGameDto) {
    try {
      const genres = await this.genreService.findMultipleGenres(
        createGameDto.genre,
      );

      const game = this.gameRepo.create({ ...createGameDto, genre: genres });

      const newGame = await this.gameRepo.save(game);

      return new ApiResponse(true, 'Game Created Successfully', { newGame });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Game
  // public async getGame(id: number) {
  //   try {
  //     const game = await this.gameRepo.findOne({
  //       where: { id },
  //       relations: ['genre'],
  //     });

  //     if (!game) {
  //       throw new RpcException({
  //         status: 404,
  //         message: 'Game not found',
  //       });
  //     }

  //     const [rating, overview] = await Promise.all([
  //       firstValueFrom<RatingInterface>(
  //         this.reviewClient.send(MessagePatterns.GET_OVERALL_RATING, {
  //           gameId: game.id,
  //         }),
  //       ),
  //       this.getAiOverview(id),
  //     ]);

  //     return new ApiResponse(true, 'Game Fetched Successfully', {
  //       ...game,
  //       overview,
  //       rating,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
  public async getGame(id: number) {
    const cacheKey = `game_profile:${id}`;

    try {
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        return new ApiResponse(
          true,
          'Game Fetched Successfully (Cached)',
          cachedData,
        );
      }

      const game = await this.gameRepo.findOne({
        where: { id },
        relations: ['genre'],
      });

      if (!game) {
        throw new RpcException({ status: 404, message: 'Game not found' });
      }

      const [rating, overview] = await Promise.all([
        firstValueFrom<RatingInterface>(
          this.reviewClient.send(MessagePatterns.GET_OVERALL_RATING, {
            gameId: game.id,
          }),
        ).catch(() => null),
        this.getAiOverview(id).catch(() => {}),
      ]);

      const result = {
        ...game,
        overview,
        rating,
      };

      await this.cacheManager.set(cacheKey, result, 900000);

      return new ApiResponse(true, 'Game Fetched Successfully', result);
    } catch (error) {
      console.error(`Error fetching game ${id}:`, error);
      throw error;
    }
  }

  // Get Games
  public async getGames(fetchGamesDto: FetchGamesDto) {
    try {
      const { page = 1, limit = 20, search } = fetchGamesDto;

      const cacheKey = `games_list:p${page}:l${limit}:s:${search || 'none'}`;

      const cachedResponse = await this.cacheManager.get(cacheKey);
      if (cachedResponse) {
        return new ApiResponse(
          true,
          'Games Fetched Successfully (Cached)',
          cachedResponse,
        );
      }

      const skip = (page - 1) * limit;
      const where: FindOptionsWhere<Game> = {};
      if (search) {
        where.name = Like(`%${search}%`);
      }

      const [games, total] = await this.gameRepo.findAndCount({
        where,
        relations: ['genre'],
        skip,
        take: limit,
        select: ['id', 'imgUrl', 'name', 'releaseDate'],
      });

      let gamesWithRating: Game[] = [];

      if (games.length > 0) {
        const ratings: RatingItem[] = await firstValueFrom<OverallRating[]>(
          this.reviewClient.send(MessagePatterns.GET_OVERALL_RATING_OF_GAMES, {
            gameId: games.map((game) => game.id),
          }),
        ).catch(() => []);
        const ratingMap = new Map(ratings.map((r) => [r.gameId, r.overall]));

        gamesWithRating = games.map((game) => {
          const rating = ratingMap.get(game.id);

          return {
            ...game,
            overall: rating !== undefined ? rating.toFixed(1) : '0.0',
          };
        });
      }

      const lastPage = Math.ceil(total / limit);
      const result = {
        games: gamesWithRating,
        meta: { total, page, lastPage },
      };

      await this.cacheManager.set(cacheKey, result, 900000);

      return new ApiResponse(true, 'Games Fetched Successfully', result);
    } catch (error) {
      console.error('GetGames Error:', error);
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
      let genres: Genre[];
      if (editGameDto.genre?.length !== 0) {
        genres = await this.genreService.findMultipleGenres(editGameDto.genre!);
        game.genre = genres;
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

  // Get Popular Games
  public async getTopRatedGames() {
    try {
      const topRatedGameIds = await firstValueFrom<number[]>(
        this.reviewClient.send(MessagePatterns.GET_TOP_RATED_GAME_IDS, {}),
      );
      const topRatedGames = await this.gameRepo.find({
        where: { id: In(topRatedGameIds) },
      });
      return new ApiResponse(
        true,
        'Top Rated Games Fetched Successfully',
        topRatedGames,
      );
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: 'Failed to fetch top rated games',
      });
    }
  }

  // Genereate AI Overview
  public async generateAiOverview(gameId: number, review: Content | null) {
    try {
      const game = await this.gameRepo.findOne({ where: { id: gameId } });
      if (!game) {
        throw new RpcException({
          status: 404,
          message: 'Game not found',
        });
      }
      const reviews = await firstValueFrom<Content[]>(
        this.reviewClient.send(MessagePatterns.GET_REVIEWS_BY_GAMEID, {
          gameId,
        }),
      );

      const existingOverview = await this.overviewRepo.findOneBy({
        game: { id: gameId },
      });

      let savedOverview: Overview;

      const overview = await this.aiProvider.aiOverview(reviews, review);
      if (existingOverview) {
        existingOverview.overview = overview ?? existingOverview.overview;
        savedOverview = await this.overviewRepo.save(existingOverview);
      } else {
        const newOverview = this.overviewRepo.create({ overview, game });
        savedOverview = await this.overviewRepo.save(newOverview);
      }

      return new ApiResponse(true, 'Overview saved', savedOverview);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: 'Failed to save',
      });
    }
  }

  // Get AI Overview
  public async getAiOverview(gameId: number) {
    try {
      const overview = await this.overviewRepo.findOne({
        where: { game: { id: gameId } },
      });
      if (!overview) {
        throw new RpcException({
          status: 404,
          message: 'Game not found',
        });
      }

      return overview;
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: 'Failed to fetch',
      });
    }
  }
}
