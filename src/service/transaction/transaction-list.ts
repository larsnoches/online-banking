import { ITransactionDto, ITransactionListDto } from '@model/transaction';
import axios, { AxiosError } from 'axios';

class TransactionListService {
  public async getList(): Promise<Array<ITransactionDto>> {
    try {
      const response = await axios.get('/api/protected/transactions');
      if (response == null || response.data == null) {
        throw new Error('Empty data response');
      }

      const transactionListDto = response.data as ITransactionListDto;
      const transListDtoData = transactionListDto.trans_token;

      if (transListDtoData.length === 0) return [];
      return transListDtoData.sort((a, b) => {
        if (a.id == null || b.id == null) return 0;
        return b.id - a.id;
      });
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

export default TransactionListService;
