import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../models/Transaction';

export default interface ITransactionsRepository {
  create(transactionData: ICreateTransactionDTO): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  delete(id: string): Promise<void>;
}
