import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index('idx_view_review_id', ['reviewId'])
@Index('idx_view_user_id', ['userId'])
@Index('idx_view_review_owner_id', ['reviewOwnerId'])
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewId: number;

  @Column()
  userId: number;

  @Column()
  reviewOwnerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
