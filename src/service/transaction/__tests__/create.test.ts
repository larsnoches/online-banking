import {
  ICreatedTransactionDto,
  ITransactionCreateDto,
  ITransactionDto,
} from '@model/transaction';
import TransactionCreateService from '../transaction-create';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Transaction Create Service', () => {
  let transactionCreateService: TransactionCreateService;
  let createTransDto: ITransactionCreateDto;
  beforeEach(() => {
    transactionCreateService = new TransactionCreateService();
    createTransDto = {
      name: 'John Doo',
      amount: 1000,
    };
  });

  it('successfully post', async () => {
    const transDto: ITransactionDto = {
      id: 10,
      username: 'John Doo',
      amount: 500,
      balance: 500,
      date: '11.08.2021',
    };
    const createdDto: ICreatedTransactionDto = {
      trans_token: {
        ...transDto,
      },
    };

    const response = {
      data: {
        ...createdDto,
      },
    };
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await expect(
      transactionCreateService.create(createTransDto),
    ).resolves.toEqual(transDto);
  });

  it('erroneously post', async () => {
    const errorMessage = 'UnauthorizedError';
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(
      transactionCreateService.create(createTransDto),
    ).rejects.toThrow(errorMessage);
  });
});
