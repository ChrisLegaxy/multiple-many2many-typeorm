import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";

import { MovieCrewRole } from "./MovieCrewRole";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany((type) => MovieCrewRole, (movieCrewRole) => movieCrewRole.role)
  movieCrewRoles: MovieCrewRole[]
}
