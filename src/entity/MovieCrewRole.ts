import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { Movie } from "./Movie";
import { Crew } from "./Crew";
import { Role } from "./Role";

@Entity()
export class MovieCrewRole {
  @PrimaryGeneratedColumn()
  movieCrewRoleId: number;

  @Column()
  movieId: number;

  @Column()
  crewId: number;

  @Column()
  roleId: number;

  @ManyToOne((type) => Movie, (movie) => movie.movieCrewRoles)
  movie: Movie;

  @ManyToOne((type) => Crew, (crew) => crew.movieCrewRoles)
  crew: Crew;

  @ManyToOne((type) => Role, (role) => role.movieCrewRoles)
  role: Role;
}
