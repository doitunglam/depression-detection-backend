import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diagnose {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  detail: string;
}
