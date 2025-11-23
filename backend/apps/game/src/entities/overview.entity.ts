import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Overview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  overview: string;

  @OneToOne(() => Game, (game) => game.overview)
  @JoinColumn()
  game: Game;
}
