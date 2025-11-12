import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';

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
}
