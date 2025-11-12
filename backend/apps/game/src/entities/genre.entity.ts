import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 265, nullable: false, type: 'varchar' })
  name: string;

  @ManyToMany(() => Game, (game) => game.genre)
  games: Game[];
}
