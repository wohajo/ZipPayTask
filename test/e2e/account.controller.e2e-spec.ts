import { INestApplication } from '@nestjs/common';
import { prepareFixture, clearDatabase, createUser } from '../helpers';
import { getMockUser } from '../mocks';
import * as request from 'supertest';

describe('Account Controller (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async () => {
    app = await prepareFixture();
    httpServer = app.getHttpServer();
    await clearDatabase(app);
  });

  it('should allow to create account', async () => {
    const user = await createUser(getMockUser('5000', '1000'), httpServer);
    const res = await request(httpServer).post(`/accounts/${user.body.id}`);

    expect(res.statusCode).toBe(201);
  });

  it('should not allow to create account', async () => {
    const user = await createUser(getMockUser('1000', '1000'), httpServer);
    const res = await request(httpServer).post(`/accounts/${user.body.id}`);

    expect(res.statusCode).toBe(400);
  });

  it('should not allow to create account twice', async () => {
    const user = await createUser(getMockUser('5000', '1000'), httpServer);
    const res = await request(httpServer).post(`/accounts/${user.body.id}`);

    expect(res.statusCode).toBe(201);

    const resTwo = await request(httpServer).post(`/accounts/${user.body.id}`);

    expect(resTwo.statusCode).toBe(409);
  });

  it('should return list with two accounts', async () => {
    for (let i = 0; i < 2; i++) {
      const user = await createUser(getMockUser('5000', '1000'), httpServer);
      await request(httpServer).post(`/accounts/${user.body.id}`);
    }

    const res = await request(httpServer).get(`/accounts`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should return list with one account', async () => {
    for (let i = 0; i < 2; i++) {
      const user = await createUser(getMockUser('5000', '1000'), httpServer);
      await request(httpServer).post(`/accounts/${user.body.id}`);
    }

    const res = await request(httpServer).get(`/accounts?skip=1&take=1`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  afterAll(async () => await app.close());
});
