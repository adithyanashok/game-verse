import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 265, nullable: false, type: 'varchar' })
  name: string;

  @Column({ length: 365, nullable: false, type: 'varchar' })
  description: string;

  @Column({ nullable: false })
  imgUrl: string;
}
