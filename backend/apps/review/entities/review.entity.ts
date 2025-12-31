import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rating } from './rating.entity';
import { Comment } from './comment.entity';

@Index('idx_review_game_id', ['gameId'])
@Index('idx_review_user_id', ['userId'])
@Index('idx_review_created_at', ['createdAt'])
@Index('idx_review_game_user', ['gameId', 'userId'])
@Index(['likeCount', 'viewCount'])
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;

  @Column()
  userId: number;

  @Column({ default: 'Adi' })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ nullable: false, type: 'longtext' })
  text: string;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: '' })
  imageUrl: string;

  @OneToOne(() => Rating, (rating) => rating.review, {
    eager: true,
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
