import { MovieRepository } from "../repositories/MovieRepository";
import { getRepository } from "typeorm";

export class MovieService {
  constructor(private movieRepository = getRepository(MovieRepository)) {}

  public findOne() {}

  public findMany() {}

  // add more methods here
}
