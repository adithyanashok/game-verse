import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussion } from './Discussion';

@Entity()
export class DiscussionBlockList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Discussion, (discussion) => discussion.id, {
    onDelete: 'CASCADE',
  })
  discussion: Discussion;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
