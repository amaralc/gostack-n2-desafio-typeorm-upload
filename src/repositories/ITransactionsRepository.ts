import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import Transaction from "../models/Transaction"

export default interface ITransactionsRepository {
  create(transactionData: ICreateTransactionDTO): Promise<Transaction>;
}
