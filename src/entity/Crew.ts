import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Crew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Movie, (movie) => movie.crews)
  movies: Movie[]
}
