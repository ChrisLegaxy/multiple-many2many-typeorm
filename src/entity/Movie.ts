import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Crew } from "./Crew";
import { Role } from './Role';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Crew, (crew) => crew.movies)
  @JoinTable()
  crews: Crew[];

  @ManyToMany((type) => Role, (role) => role.movies)
  @JoinTable()
  roles: Crew[];
}
