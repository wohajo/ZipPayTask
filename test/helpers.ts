import { ValidationPipe } from '@nestjs/common';
import { HttpServer, INestApplication } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import * as bodyParser from 'body-parser';
import { UserEntity } from '../src/user/user.entity';
import * as request from 'supertest';

export async function clearDatabase(app: INestApplication) {
  const repos: Repository<any>[] = await Promise.all([
    await app.get('AccountEntityRepository'),
    await app.get('UserEntityRepository'),
  ]);

  for (const repo of repos) {
    await repo.remove(await repo.find({}));
  }
}

export async function prepareFixture() {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication(null, {
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.init();

  return app;
}

export async function createUser(user: UserEntity, server: HttpServer) {
  return request(server).post(`/users`).send({
    email: user.email,
    expenses: user.expenses,
    salary: user.salary,
    name: user.name,
  });
}
