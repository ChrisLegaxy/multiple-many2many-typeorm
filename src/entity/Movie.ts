import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Crew } from "./Crew";
import { Role } from "./Role";
import { MovieCrewRole } from "./MovieCrewRole";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => MovieCrewRole, (movieCrewRole) => movieCrewRole.movie, {eager:true})
  movieCrewRoles: MovieCrewRole[];
}
