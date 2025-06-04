import { Test, TestingModule } from '@nestjs/testing';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import * as request from 'supertest';
import { TestingTypeOrmModule } from '../test-utils/testing-modules';
import { INestApplication } from '@nestjs/common';
import { Task, TaskList } from './entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodoListController', () => {
  let app: INestApplication;
  let service: TaskListService;
  let taskListRepository: Repository<TaskList>;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TestingTypeOrmModule(),
      controllers: [TaskListController],
      providers: [TaskListService],
    }).compile();

    service = module.get<TaskListService>(TaskListService);
    app = module.createNestApplication();
    await app.init();
    taskListRepository = module.get<Repository<TaskList>>(
      getRepositoryToken(TaskList),
    );
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all task list', async () => {
    const list1 = {
      name: 'my list 1',
      id: 'id 1',
      tasks: [],
    };
    const list2 = {
      name: 'my list 2',
      id: 'id 2',
      tasks: [],
    };
    await taskListRepository.save(list1);
    await taskListRepository.save(list2);
    const res = await request(app.getHttpServer())
      .get('/task-list')
      .expect(200);
    expect(res.body).toMatchSnapshot()
  });

  it('should create task list', async () => {
    const payload = { name: 'my list', id: 'id' };
    const res = await request(app.getHttpServer())
      .post('/task-list')
      .send(payload)
      .expect(201);
    expect(res.body).toEqual({
      data: {
        tasks: [],
        ...payload,
      },
    });
    expect(await service.getAllTaskList()).toMatchObject([
      {
        ...payload,
      },
    ]);
  });

  it('should delete task list', async () => {
    const list = {
      name: 'my list 1',
      id: 'id-1',
      tasks: [],
    };
    await taskListRepository.save(list);
    await request(app.getHttpServer()).delete('/task-list/id-1').expect(200);
    expect(await service.getAllTaskList()).toEqual([]);
  });

  it('should show error while deleting task list', async () => {
    const res = await request(app.getHttpServer())
      .delete('/task-list/id-1')
      .expect(404);
    expect(res.body).toEqual({
      code: 'list.no-found',
    });
  });

  it('should get tasks of list', async () => {
    const tasks = [
      {
        id: 'task-1',
        name: 'Task A',
        description: '',
        creationDate: new Date('2025-02-01').toISOString(),
        date: new Date('2025-02-10').toISOString(),
        completed: false,
      },
    ];
    const list = {
      id: 'id-1',
      name: 'my list 1',
      tasks,
    };
    await taskListRepository.save(list);
    const res = await request(app.getHttpServer())
      .get('/task-list/id-1')
      .expect(200);
    expect(res.body).toMatchSnapshot()
  });

  it('should add task to list', async () => {
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
      tasks: [],
    };
    await taskListRepository.save(list);
    const res = await request(app.getHttpServer())
      .post('/task-list/id-1')
      .send(task)
      .expect(201);
    expect(res.body).toMatchSnapshot()
    expect(
      await taskRepository.find({
        where: {
          id: 'task-1',
        },
      }),
    ).toMatchSnapshot()
  });


});
