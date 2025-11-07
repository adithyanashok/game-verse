import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ length: 496, nullable: false })
  bio: string;

  @Column({ length: 296, nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column()
  password?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  role: Role;
}
