import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from '../task-list/entities';
import { User } from '../auth/entities';
import { ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../auth/constants';
import { Repository } from 'typeorm';
import { makeUser } from './factories';

const entities = [Task, TaskList, User];

export const createTestingApp = async (module: TestingModule) => {
  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app;
};

export const TestingModules = () => [
  JwtModule.register({
    secret: jwtSecret,
    signOptions: { expiresIn: '60s' },
  }),
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
];

export const createUserAndToken =
  (module: TestingModule) =>
  async ({ email }: Pick<User, 'email'>) => {
  const userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  const jwtService = module.get(JwtService);
  const user = await userRepository.save(makeUser({ email }));
  return {
    user,
    token: jwtService.sign({sub: email})
  }
}