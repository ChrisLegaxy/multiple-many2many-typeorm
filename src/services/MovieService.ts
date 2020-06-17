import { MovieRepository } from "../repositories/MovieRepository";
import { getRepository, getConnection, getCustomRepository } from "typeorm";

export class MovieService {
  constructor(public movieRepository = getCustomRepository(MovieRepository)) {}

  public async find() {
    return await this.movieRepository.find();
  }

  public findMany() {}
  // add more methods here
}
  