import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from '../task-list/entities';
import { User } from '../auth/entities';
import { ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

const entities = [Task, TaskList, User];

export const createTestingApp = async (module: TestingModule) => {
  const app  = module.createNestApplication()
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app
}

export const TestingTypeOrmModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
];
