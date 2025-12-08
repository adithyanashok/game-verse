import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 296, nullable: false })
  name: string;

  @Column({ length: 496, nullable: true })
  bio?: string;

  @Column({ length: 296, nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'varchar', nullable: true })
  googleId?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  role: Role;

  @Column({ default: 0 })
  followerCount: number;

  @ManyToMany(() => User, (user) => user.followers, {
    cascade: false,
  })
  @JoinTable({
    name: 'user_followers',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'following_id',
      referencedColumnName: 'id',
    },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following, {
    cascade: false,
  })
  followers: User[];
}
