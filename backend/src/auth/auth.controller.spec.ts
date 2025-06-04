import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  createTestingApp,
  TestingModules,
} from '../test-utils/testing-modules';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities';
import { AuthService } from './auth.service';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TestingModules(),
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = await createTestingApp(module);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const payload = {
      firstName: 'Pierre',
      lastName: 'Dupont',
      email: 'pierre@gmail.com',
      password: 'password123',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload)
      .expect(201);
    expect(
      await userRepository.findOne({ where: { email: payload.email } }),
    ).toMatchSnapshot({
      password: expect.any(String),
    });
  });
});
