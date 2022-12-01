import { randomUUID } from 'crypto';
import { UserEntity } from '../src/user/user.entity';

export const getMockUser = (salary: string, expenses: string): UserEntity => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    email: `${randomUUID()}@email.com`,
    expenses: expenses,
    salary: salary,
    name: randomUUID(),
    id: randomUUID(),
  };
};
