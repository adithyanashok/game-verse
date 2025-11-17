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

  @ManyToMany(() => View, (view) => view.review, {
    cascade: true,
  })
  @JoinTable()
  views: View[];

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
