import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskList } from './entities';
import { User } from '../auth/entities';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getAllTaskList(user: User): Promise<TaskList[]> {
    return this.taskListRepository.find({
      where: { user },
      relations: ['tasks'],
    });
  }

  async removeTaskList(id: string, user: User): Promise<void> {
    const taskList = await this.taskListRepository.findOne({
      where: { id, user },
    });
    if (!taskList) {
      throw new NotFoundException({ code: 'list.not-found' });
    }
    await this.taskListRepository.delete(id);
  }

  async getTasksByListId(taskListId: string, user: User) {
    return this.taskRepository.find({
      where: { taskList: { id: taskListId, user } },
    });
  }

  async createTaskList(data: TaskList): Promise<TaskList> {
    const taskList = this.taskListRepository.create(data);
    return this.taskListRepository.save(taskList);
  }

  async addTaskToList(
    listId: string,
    user: User,
    taskData: Omit<Task, 'taskList'>,
  ): Promise<Task> {
    const list = await this.taskListRepository.findOne({
      where: { id: listId, user },
    });
    if (!list) throw new NotFoundException({ code: 'list.not-found' });

    const task = this.taskRepository.create({ ...taskData, taskList: list });
    return this.taskRepository.save(task);
  }

  async updateTask(
    taskId: string,
    user: User,
    updates: Omit<Partial<Task>, 'taskList'>,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, taskList: {user} },
    });

    if (!task) throw new NotFoundException({ code: 'task.not-found' });

    Object.assign(task, updates);
    return this.taskRepository.save(task);
  }

  async removeTask(taskId: string, user: User): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, taskList: { user } },
    });

    if (!task) throw new NotFoundException({ code: 'task.not-found' });

    await this.taskRepository.remove(task);
  }
}
