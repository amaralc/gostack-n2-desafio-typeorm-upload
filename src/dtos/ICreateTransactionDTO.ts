import Category from '../models/Category';

export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category;
}
