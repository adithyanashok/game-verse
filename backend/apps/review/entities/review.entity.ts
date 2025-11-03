import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { View } from './view.entity';
import { Rating } from './rating.entity';

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

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @ManyToMany(() => Like, (like) => like.review, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  like: Like[];

  @ManyToMany(() => View, (view) => view.review, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  views: View[];

  @OneToOne(() => Rating, (rating) => rating.review, {
    cascade: true,
    eager: true,
  })
  // @JoinColumn()
  rating: Rating;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
