import IGetBalanceResponseDTO from './IGetBalanceResponseDTO';
import Transaction from '../models/Transaction';

export default interface IListTransactionsResponseDTO {
  transactions: Transaction[];
  balance: IGetBalanceResponseDTO;
}
