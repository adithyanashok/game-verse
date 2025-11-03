import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { View } from './view.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToMany(() => Like, (like) => like.review)
  @JoinTable()
  like: Like[];

  @ManyToMany(() => View, (view) => view.review)
  @JoinTable()
  view: View[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
