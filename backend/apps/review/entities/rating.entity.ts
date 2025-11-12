import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  // @Exclude()
  @OneToOne(() => Review, (review) => review.rating)
  @JoinColumn()
  review: Review;

  @Column()
  gameId: number;

  @Column({ default: 0 })
  overall: number;

  @Column()
  graphics: number;

  @Column()
  gameplay: number;

  @Column()
  story: number;

  @Column()
  sound: number;
}
