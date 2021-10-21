import {
  ICreatedTransactionDto,
  ITransactionCreateDto,
  ITransactionDto,
} from '@model/transaction';
import axios, { AxiosError } from 'axios';

class TransactionCreateService {
  public async create(
    transDto: ITransactionCreateDto,
  ): Promise<ITransactionDto> {
    try {
      const response = await axios.post(
        '/api/protected/transactions',
        transDto,
      );
      if (response == null || response.data == null) {
        throw new Error('Empty data response');
      }

      const createdDto = response.data as ICreatedTransactionDto;
      const transCreatedDtoData = createdDto.trans_token;
      if (transCreatedDtoData == null) throw new Error('Empty trans data');

      return transCreatedDtoData;
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response) {
        throw new Error(axiosErr.response?.data);
      } else if (axiosErr.request) {
        throw new Error('Request error');
      } else {
        throw err;
      }
    }
  }
}

export default TransactionCreateService;
