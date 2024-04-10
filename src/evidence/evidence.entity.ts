import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  url: string;

  @Column()
  is_analyzed: boolean;
}
