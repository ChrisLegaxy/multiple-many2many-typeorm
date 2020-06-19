import { JsonController, Get, Res, Post, Param, Body } from "routing-controllers";
import { Response } from "express";
import { MovieService } from "../services/MovieService";
import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";

@JsonController("/movies")
export class MovieController {
  constructor(
    private movieService: MovieService = new MovieService(),
    private repo = getRepository(Movie)
  ) {}
  // it should work here (I haven't implemented dependency injection so you have to instatiate)

  @Get()
  private async getMovies(@Res() response: Response){
    return response.json(await this.movieService.getAllMovies());
  }

  @Get('/:id')
  private async getAllMovieById(@Res() response: Response, @Param("id") movieId: number) {
    return response.json(await this.movieService.getMovieById(movieId));
  }

  @Post()
  private async createMovie(@Res() response: Response, @Body() data) {
    return response.json(await this.movieService.createMovie(data))
  }
}
