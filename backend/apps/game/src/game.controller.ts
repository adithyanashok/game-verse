import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateGameDto,
  CreateGenreDto,
  EditGameDto,
  MessagePatterns,
} from 'libs/common/src';
import { GenreService } from './genre/genre.service';

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly genreService: GenreService,
  ) {}

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

  @MessagePattern(MessagePatterns.GET_GAMES)
  public async getGames() {
    return await this.gameService.getGames();
  }

  @MessagePattern(MessagePatterns.FIND_ONE_GAME)
  public async findOne(@Payload() payload: { id: number }) {
    console.log(payload);
    return await this.gameService.findOne(payload.id);
  }

  @MessagePattern(MessagePatterns.CREATE_GENRE)
  public async createGenre(payload: CreateGenreDto) {
    return await this.genreService.create(payload);
  }

  @MessagePattern(MessagePatterns.DELETE_GENRE)
  public async deleteGenre(@Payload() payload: { id: number }) {
    return await this.genreService.delete(payload.id);
  }

  @MessagePattern(MessagePatterns.GET_TOP_RATED_GAMES)
  public async getTopRatedGame() {
    return await this.gameService.getTopRatedGames();
  }
}
