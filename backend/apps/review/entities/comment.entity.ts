import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Review } from './review.entity';

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

  // Optional parent for replies; simple numeric reference to avoid deep relation complexity
  @Column({ type: 'int', nullable: true })
  parentCommentId?: number | null;

  // Optional reverse relation for completeness (not required for functionality)
  @OneToMany(() => Comment, () => undefined)
  replies?: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
