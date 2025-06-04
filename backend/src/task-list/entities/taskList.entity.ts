import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import Task from './task.entity';

@Entity()
export default class TaskList {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.taskList, { cascade: true })
  tasks: Task[];
}
