import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskList } from './entities';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getAllTaskList(): Promise<TaskList[]> {
    return this.taskListRepository.find({
      relations: ['tasks'],
    });
  }

  async removeTaskList(id: string): Promise<void> {
    const taskList = await this.taskListRepository.findOne({
      where: { id },
    });
    if (!taskList) {
      throw new NotFoundException({ code: 'list.no-found' });
    }
    await this.taskListRepository.delete(id);
  }

  async getTasksByListId(taskListId: string) {
    return this.taskRepository.find({
      where: { taskList: { id: taskListId } },
    });
  }

  async createTaskList(data: TaskList): Promise<TaskList> {
    const taskList = this.taskListRepository.create(data);
    return this.taskListRepository.save(taskList);
  }

  async addTaskToList(
    listId: string,
    taskData: Omit<Task, 'taskList'>,
  ): Promise<Task> {
    const list = await this.taskListRepository.findOne({
      where: { id: listId },
    });
    if (!list) throw new NotFoundException({ code: 'list.no-found' });

    const task = this.taskRepository.create({ ...taskData, taskList: list });
    return this.taskRepository.save(task);
  }

  async updateTask(
    taskId: string,
    updates: Omit<Partial<Task>, 'taskList'>,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) throw new NotFoundException({ code: 'task.no-found' });

    Object.assign(task, updates);
    return this.taskRepository.save(task);
  }

  async removeTask(taskId: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) throw new NotFoundException({ code: 'task.not-found' });

    await this.taskRepository.remove(task);
  }
}
