import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Crew } from "./Crew";
import { Role } from "./Role";
import { MovieCrewRole } from "./MovieCrewRole";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => MovieCrewRole, (movieCrewRole) => movieCrewRole.movie, {eager:true})
  movieCrewRoles: MovieCrewRole[];
}
