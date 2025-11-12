import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, CreateGenreDto } from 'libs/common/src';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    /**
     * Inject Genre Respository
     */
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  public async create(createGenreDto: CreateGenreDto) {
    try {
      console.log('savedGenre');
      const genre = this.genreRepo.create(createGenreDto);
      const savedGenre = await this.genreRepo.save(genre);
      return new ApiResponse(true, 'Genre Created Successfully', savedGenre);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async findMultipleGenres(ids: number[]) {
    try {
      const genres = this.genreRepo.find({ where: { id: In(ids) } });

      return genres;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const genre = await this.genreRepo.delete(id);

      return new ApiResponse(true, 'Genre Deleted Successfully', genre);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
