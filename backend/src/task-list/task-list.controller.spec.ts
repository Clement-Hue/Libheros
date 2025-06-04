import { Test, TestingModule } from '@nestjs/testing';
import { TaskListController } from './task-list.controller';

describe('TodoListController', () => {
  let controller: TaskListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskListController],
    }).compile();

    controller = module.get<TaskListController>(TaskListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
