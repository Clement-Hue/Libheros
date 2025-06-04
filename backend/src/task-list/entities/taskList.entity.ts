import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import Task from './task.entity';
import { User } from '../../auth/entities';

@Entity()
export default class TaskList {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.taskList, { cascade: true })
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.taskLists, { onDelete: 'CASCADE' })
  user: User;
}
