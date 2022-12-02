import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getMockUser } from '../mocks';
import { clearDatabase, createUser, prepareFixture } from '../helpers';
import { randomUUID } from 'crypto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async () => {
    app = await prepareFixture();
    httpServer = app.getHttpServer();
    await clearDatabase(app);
  });

  it('should allow to create user', async () => {
    const user = getMockUser('1000', '1000');
    const res = await createUser(user, httpServer);

    expect(res.statusCode).toBe(201);
  });

  it('should allow to find created user', async () => {
    const user = getMockUser('1000', '1000');
    const createdUser = await createUser(user, httpServer);

    expect(createdUser.statusCode).toBe(201);

    const res = await request(httpServer).get(`/users/${createdUser.body.id}`);

    expect(res.statusCode).toBe(200);
  });

  it('should not find non existent user', async () => {
    const res = await request(httpServer).get(`/users/${randomUUID()}`);

    expect(res.statusCode).toBe(404);
  });

  it('should return list with two users', async () => {
    for (let i = 0; i < 2; i++)
      await createUser(getMockUser('5000', '1000'), httpServer);

    const res = await request(httpServer).get(`/users`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should return list with one user', async () => {
    for (let i = 0; i < 2; i++)
      await createUser(getMockUser('1000', '1000'), httpServer);

    const res = await request(httpServer).get(`/users?skip=1&take=1`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  afterAll(async () => await app.close());
});
