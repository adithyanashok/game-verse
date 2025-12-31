import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 356, nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  adminId: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  totalMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
