import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import TaskList from './taskList.entity';

@Entity()
export default class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'datetime' })
  creationDate: Date;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  taskList: TaskList;
}
