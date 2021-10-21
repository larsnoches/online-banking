import { ITransactionDto, ITransactionListDto } from '@model/transaction';
import TransactionListService from '../transaction-list';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Transaction List Service', () => {
  let transactionListService: TransactionListService;
  beforeEach(() => {
    transactionListService = new TransactionListService();
  });

  it('successfully post', async () => {
    const transactionsDto: Array<ITransactionDto> = [
      {
        id: 101,
        username: 'Joohn Dooo',
        amount: 500,
        balance: 500,
        date: '11.08.2021',
      },
      {
        id: 10,
        username: 'John Doo',
        amount: 500,
        balance: 500,
        date: '10.08.2021',
      },
    ];
    const transactionListDto: ITransactionListDto = {
      trans_token: [...transactionsDto],
    };

    const response = {
      data: {
        ...transactionListDto,
      },
    };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await expect(transactionListService.getList()).resolves.toEqual(
      transactionsDto,
    );
  });

  it('erroneously post', async () => {
    const errorMessage = 'UnauthorizedError';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(transactionListService.getList()).rejects.toThrow(
      errorMessage,
    );
  });
});
