import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateGameDto,
  CreateGenreDto,
  EditGameDto,
  MessagePatterns,
  ServiceName,
} from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { RoleGuard } from '../src/guards/role.guard';
import { Roles } from '../src/decorators/roles.decorators';
import { Role } from '../src/enums/role.enum';

@ApiBearerAuth()
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
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Post('create-game')
  public async createGame(@Body() createGameDto: CreateGameDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GAME_CREATE, createGameDto),
      );
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({
    summary: 'Api for updating Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game updated successfully',
  })
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Patch('edit-game')
  public async editGame(@Body() editGameDto: EditGameDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GAME_UPDATE, editGameDto),
      );
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({
    summary: 'Api for deleting Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game Deleted successfully',
  })
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Delete('delete-game')
  public async deleteGame(@Query('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GAME_DELETE, id),
      );
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({
    summary: 'Api for get a Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game Fetched successfully',
  })
  @Roles(Role.User, Role.Admin)
  @UseGuards(RoleGuard)
  @Get('get-game')
  public async getGame(@Query('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GAME_GET, id),
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * Get Games
   */
  @ApiOperation({
    summary: 'Get Games',
  })
  @ApiResponse({
    status: 200,
    description: 'Games Fetched successfully',
  })
  @Get('get-games')
  public async getGames(): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GET_GAMES, {}),
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * Create Genre
   */
  @ApiOperation({
    summary: 'Create Genre',
  })
  @ApiResponse({
    status: 201,
    description: 'Genre Created Successfully',
  })
  @Post('create-genre')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RoleGuard)
  public async createGenre(
    @Body() createGenreDto: CreateGenreDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.CREATE_GENRE, createGenreDto),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: 'Get Top Rated Games',
  })
  @ApiResponse({
    status: 200,
    description: 'Top Rated Games Fetched Successfully',
  })
  @Get('get-top-rated-games')
  public async getTopRatedGames(): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GET_TOP_RATED_GAMES, {}),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: 'Get AI Overview',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetched Successfully',
  })
  @Get('get-ai-overview')
  public async getAiOverview(
    @Query('gameId', ParseIntPipe) gameId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.gameClient.send(MessagePatterns.GET_AI_OVERVIEW, { gameId }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
