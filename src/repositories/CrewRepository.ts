import { EntityRepository, Repository } from 'typeorm';
import { Crew } from '../entity/Crew';

@EntityRepository(Crew)
export class CrewRepository extends Repository<Crew> {}
