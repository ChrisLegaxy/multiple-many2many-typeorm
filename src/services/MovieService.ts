import { MovieRepository } from "../repositories/MovieRepository";
import { getRepository, getConnection, getCustomRepository } from "typeorm";
import { MovieCrewRole } from "../entity/MovieCrewRole";
import { Crew } from "../entity/Crew";
import { CrewRepository } from "../repositories/CrewRepository";
import e from "express";
import { Movie } from "../entity/Movie";

export class MovieService {
  constructor(
    public movieRepository = getCustomRepository(MovieRepository),
    public crewRepository = getCustomRepository(CrewRepository)
    ) {}

  public async find() {
    return await this.movieRepository.find();
  }

  public async groupCrew(movieCrewRole){
    const res = []
    const crewIds = Array.from(new Set(movieCrewRole.map(e => e.crewId)))
    const crews =  await this.crewRepository.findByIds(crewIds)
   
    for( let crew of crews){
      const temp = {}
      temp['name'] = crew.name
      temp['role'] = movieCrewRole.filter(e => e.crewId === crew.id).map(e => ({
        role: e.role.role
      }))
      res.push(temp)
    }
    return res
  }

  private async formMovieData(movie: Movie){
    return {
      'title': movie.title,
      'crews': await this.groupCrew(movie.movieCrewRoles)
    }
  }

  public async getMovieById(movieId: number){
    const movie = await this.movieRepository.findOne(movieId)
    return this.formMovieData(movie)
  }

  public async getAllMovies(){
    const movies = await this.movieRepository.find()
    return Promise.all(movies.map(async movie => this.formMovieData(movie)))
  }

  public findMany() {}
  // add more methods here
}
  