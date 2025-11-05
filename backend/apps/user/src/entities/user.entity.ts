import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: false })
  password: string;
}
