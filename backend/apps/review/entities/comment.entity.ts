import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Review } from './review.entity';

@Index('idx_comment_review_created', ['review', 'createdAt'])
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  comment: string;

  @ManyToOne(() => Review, (review) => review.comment, { onDelete: 'CASCADE' })
  review: Review;

  @Column({ type: 'int', nullable: true })
  parentCommentId?: number | null;

  @OneToMany(() => Comment, () => undefined)
  replies?: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
