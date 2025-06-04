import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TaskListService } from '../task-list.service';
import { Repository } from 'typeorm';
import { Task, TaskList } from '../entities';
import {
  createTestingApp, createUserAndToken,
  TestingModules,
} from '../../test-utils/testing-modules';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TaskController } from './task.controller';
import { AuthModule } from '../../auth/auth.module';

const email = 'pierre@hotmail.fr';

describe('TaskController', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;
  let taskListRepository: Repository<TaskList>;
  let token: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingModules(), AuthModule],
      controllers: [TaskController],
      providers: [TaskListService],
    }).compile();

    app = await createTestingApp(module);
    taskListRepository = module.get<Repository<TaskList>>(
      getRepositoryToken(TaskList),
    );
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    token = await createUserAndToken(module)({ email }).then(
      ({ token }) => token,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should remove task', async () => {
    const task = {
      id: 'task-1',
      name: 'Task A',
      description: '',
      creationDate: new Date('2025-02-01').toISOString(),
      date: new Date('2025-02-10').toISOString(),
      completed: false,
    };
    const list = {
      id: 'id-1',
      name: 'my list 1',
      tasks: [task],
      user: { email },
    };
    await taskListRepository.save(list);
    expect(
      await taskRepository.findOne({
        where: {
          id: 'task-1',
        },
      }),
    ).not.toBeNull();
    await request(app.getHttpServer()).delete('/task/task-1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(
      await taskRepository.findOne({
        where: {
          id: 'task-1',
        },
      }),
    ).toBeNull();
  });

  it('should show error while updating task', async () => {
    const res = await request(app.getHttpServer())
      .put('/task/task-1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task AB',
        description: '',
        creationDate: new Date('2025-02-01').toISOString(),
        date: new Date('2025-02-10').toISOString(),
        completed: true,
      })
      .expect(404);
    expect(res.body).toEqual({
      code: 'task.not-found',
    });
  });

  it('should update task', async () => {
    const task = {
      id: 'task-1',
      name: 'Task A',
      description: '',
      creationDate: new Date('2025-02-01').toISOString(),
      date: new Date('2025-02-10').toISOString(),
      completed: false,
    };
    const list = {
      id: 'id-1',
      name: 'my list 1',
      tasks: [task],
      user: { email },
    };
    await taskListRepository.save(list);
    const res = await request(app.getHttpServer())
      .put('/task/task-1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task AB',
        description: '',
        creationDate: new Date('2025-02-01').toISOString(),
        date: new Date('2025-02-10').toISOString(),
        completed: true,
      })
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should show unauthorized', async () => {
    await request(app.getHttpServer())
      .put('/task/task-1')
      .send({
        name: 'Task AB',
        description: '',
        creationDate: new Date('2025-02-01').toISOString(),
        date: new Date('2025-02-10').toISOString(),
        completed: true,
      })
      .expect(401);
  });
});
