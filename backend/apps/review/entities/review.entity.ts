import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { View } from './view.entity';
import { Rating } from './rating.entity';
import { Comment } from './comment.entity';

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
  text: string;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @ManyToMany(() => Like, (like) => like.review, {
    cascade: true,
  })
  @JoinTable()
  like: Like[];

  @ManyToMany(() => View, (view) => view.review, {
    cascade: true,
  })
  @JoinTable()
  views: View[];

  @OneToOne(() => Rating, (rating) => rating.review, {
    cascade: true,
  })
  // @JoinColumn()
  rating: Rating;

  @OneToMany(() => Comment, (comment) => comment.review, { cascade: true })
  comment: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
