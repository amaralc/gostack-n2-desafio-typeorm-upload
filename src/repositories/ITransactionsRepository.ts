import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ICreateBulkTransactionsDTO from '../dtos/ICreateBulkTransactionsDTO';
import Transaction from '../models/Transaction';

export default interface ITransactionsRepository {
  create(transactionData: ICreateTransactionDTO): Promise<Transaction>;
  createFromListOfTransactions(
    listOfTransactions: ICreateBulkTransactionsDTO,
  ): Promise<Transaction[]>;
  findAll(): Promise<Transaction[]>;
  delete(id: string): Promise<void>;
}
