import Category from '../models/Category';

interface ICreateTransactionWithCategoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category;
}

type ICreateBulkTransactionsDTO = ICreateTransactionWithCategoryDTO[];

export default ICreateBulkTransactionsDTO;
