import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussion } from './Discussion';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'int', nullable: false })
  senderId: number;

  @ManyToOne(() => Discussion, (discussion) => discussion.id, {
    onDelete: 'CASCADE',
  })
  discussion: Discussion;

  @CreateDateColumn()
  createdAt: Date;
}
