import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @ManyToMany((type) => Movie, (movie) => movie.roles)
  movies: Movie[];
}
