export interface ITransactionDto {
  id: number | null;
  date: string | null;
  username: string | null;
  amount: number | null;
  balance: number | null;
}

export interface ITransactionListDto {
  trans_token: Array<ITransactionDto>;
}

export interface ITransactionCreateDto {
  name: string | null;
  amount: number | null;
}

export interface ICreatedTransactionDto {
  trans_token: ITransactionDto;
}
