import { JsonController, Get, Res, Post } from "routing-controllers";
import { Response, response } from "express";
import { MovieService } from "../services/MovieService";
import { getCustomRepository, getRepository } from "typeorm";
import { MovieCrewRole } from "../entity/MovieCrewRole";
import { Movie } from "../entity/Movie";

@JsonController("/movies")
export class MovieController {
  constructor(
    private movieService: MovieService = new MovieService(),
    private repo = getRepository(MovieCrewRole)
  ) {}
  // it should work here (I haven't implemented dependency injection so you have to instatiate)

  @Get()
  public async getAllMovies(@Res() response: Response) {
    const test = await this.repo.findOne(1, {
      relations: ["movie", "crew", "role"],
    });

    const test2 = await this.repo
      .createQueryBuilder("movieCrewRole")

      .leftJoinAndSelect("movieCrewRole.movie", "movie")
      .leftJoinAndSelect("movieCrewRole.crew", "crew")
      .leftJoinAndSelect("movieCrewRole.role", "role")
      .where("movieCrewRole.movieId = :id", { id: 1 })
      // .groupBy("movieCrewRole.movieCrewRoleId")

      .getMany();
    return response.json(test2);
  }

  @Post()
  public async createMovie(@Res() response: Response) {}
}
