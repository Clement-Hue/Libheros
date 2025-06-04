import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from '../task-list/entities';
import { User } from '../auth/entities';

const entities = [Task, TaskList, User];

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
