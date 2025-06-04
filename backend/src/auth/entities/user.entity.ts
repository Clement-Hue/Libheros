import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryColumn()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;
}
