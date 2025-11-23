import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Overview } from './overview.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 265, nullable: false, type: 'varchar' })
  name: string;

  @Column({ length: 365, nullable: false, type: 'varchar' })
  releaseDate: string;

  @Column({ length: 365, nullable: false, type: 'varchar' })
  description: string;

  @Column({ nullable: false })
  imgUrl: string;

  @ManyToMany(() => Genre, (tag) => tag.games)
  @JoinTable()
  genre: Genre[];

  @OneToOne(() => Overview, (overview) => overview.game)
  overview: Overview;
}
