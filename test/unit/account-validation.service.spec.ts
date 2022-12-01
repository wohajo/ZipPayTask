import { Test, TestingModule } from '@nestjs/testing';
import { AccountValidationService } from '../../src/account/services/account-validation.service';
import { getMockUser } from '../mocks';
import { BigNumber } from 'bignumber.js';

describe('Account Validation Service', () => {
  let service: AccountValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountValidationService],
    }).compile();

    service = module.get<AccountValidationService>(AccountValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Account Validation Service', () => {
  let service: AccountValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountValidationService],
    }).compile();

    service = module.get<AccountValidationService>(AccountValidationService);
  });

  it('should validate user credit positively', () => {
    const salary = '5000';
    const expenses = '1000';
    const user = getMockUser(salary, expenses);
    expect(
      service
        .validateCredit(user)
        .isEqualTo(BigNumber(salary).minus(BigNumber(expenses))),
    ).toBe(true);
  });

  it('should validate user credit negatively, throw error', () => {
    const salary = '1000';
    const expenses = '5000';
    const user = getMockUser(salary, expenses);
    expect(() => service.validateCredit(user)).toThrowError(
      'User has not enough avaliable funds.',
    );
  });
});
