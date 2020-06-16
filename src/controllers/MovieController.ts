import { JsonController, Get, Res } from "routing-controllers";
import { Response } from "express";
import { MovieService } from "../services/MovieService";

@JsonController("/movies")
export class MovieController {

  constructor(private movieService:​ MovieService = new MovieService()) {} 
  // it should work here (I haven't implemented dependency injection so you have to instatiate)

  @Get()
  public getAllMovies(@Res() response: Response) {
    return response.json({
      msg: 'Hello World'
    })
  }
}
