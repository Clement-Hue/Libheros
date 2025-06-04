import { TaskList } from '../../task-list/entities';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => TaskList, (taskList) => taskList.user)
  taskLists: TaskList[];
}
