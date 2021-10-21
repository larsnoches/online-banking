import { ITransactionCreateDto, ITransactionDto } from '@model/transaction';
import TransactionCreateService from './transaction-create';
import TransactionListService from './transaction-list';

// facade service
class TransactionService {
  private readonly transactionListService = new TransactionListService();
  private readonly transactionCreateService = new TransactionCreateService();

  public getList(): Promise<Array<ITransactionDto>> {
    return this.transactionListService.getList();
  }

  public create(transDto: ITransactionCreateDto): Promise<ITransactionDto> {
    return this.transactionCreateService.create(transDto);
  }
}

const transactionService = new TransactionService();
export default transactionService;
