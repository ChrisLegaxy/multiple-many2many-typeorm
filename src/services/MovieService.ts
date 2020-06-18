import { MovieRepository } from "../repositories/MovieRepository";
import { getRepository, getConnection, getCustomRepository } from "typeorm";
import { MovieCrewRole } from "../entity/MovieCrewRole";
import { Crew } from "../entity/Crew";
import { CrewRepository } from "../repositories/CrewRepository";
import e from "express";

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
    const crews =  await this.crewRepository.createQueryBuilder("crew")
    .where("crew.id IN (:...ids)", {ids: crewIds})
    .getMany()
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

  public async getMovieById(movieId: number){
    const res = {}
    const movie = await this.movieRepository.findOne({where: {id: movieId}})
    res['title'] = movie.title
    res['crews'] = await this.groupCrew(movie.movieCrewRoles)
    return res
  }

  public findMany() {}
  // add more methods here
}
  