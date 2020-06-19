import { MovieRepository } from "../repositories/MovieRepository";
import { getCustomRepository, getManager } from "typeorm";
import { CrewRepository } from "../repositories/CrewRepository";
import { Movie } from "../entity/Movie";
import { MovieCrewRole } from "../entity/MovieCrewRole";

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

  public async createMovie(data){
    const movie = new Movie()
    movie.title = data.title
    await movie.save()

    const dataInsert = []

    data.crews.forEach(crew => {
      crew.roles.forEach(role => {
        dataInsert.push({
          'crewId': crew.id,
          'roleId': role.role,
          'movieId': movie.id
        })
      });
    });

    await this.movieRepository
      .createQueryBuilder()
      .insert()
      .into(MovieCrewRole)
      .values(dataInsert)
      .execute()
    return await this.getMovieById(movie.id)
  }

  public findMany() {}
  // add more methods here
}
  