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
import { makeUser } from '../test-utils/factories';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import * as bcrypt from "bcrypt"

describe('AuthController', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TestingModules(),
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = await createTestingApp(module);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
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

  it("should get access token", async () => {
    const payload = {
      email: 'pierre@gmail.com',
      password: 'password123',
    };
    const user = makeUser({
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 10)
    })
    await userRepository.save(user)
    const res = await request(app.getHttpServer())
      .post('/auth')
      .send(payload)
      .expect(200);
    const jwtPayload = jwtService.verify(res.body.data?.access_token, {secret: jwtSecret})
    expect(jwtPayload.sub).toEqual(payload.email)
  })

  it("should show error invalid password", async () => {
    const payload = {
      email: 'pierre@gmail.com',
      password: 'pass',
    };
    const user = makeUser({
      email: payload.email,
      password: bcrypt.hashSync("password123!", 10)
    })
    await userRepository.save(user)
    const res = await request(app.getHttpServer())
      .post('/auth')
      .send(payload)
      .expect(401);
    expect(res.body).toMatchSnapshot()
  })

  it("should show error invalid email", async () => {
    const payload = {
      email: 'wrong@gmail.com',
      password: 'password123!',
    };
    const user = makeUser({
      email: 'pierre@gmail.com',
      password: bcrypt.hashSync(payload.password, 10)
    })
    await userRepository.save(user)
    const res = await request(app.getHttpServer())
      .post('/auth')
      .send(payload)
      .expect(401);
    expect(res.body).toMatchSnapshot()
  })
});
