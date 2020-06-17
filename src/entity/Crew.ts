import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Movie } from "./Movie";
import { MovieCrewRole } from "./MovieCrewRole";

@Entity()
export class Crew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => MovieCrewRole, (movieCrewRole) => movieCrewRole.crew)
  movieCrewRoles: MovieCrewRole[]
}
