export default interface ICreateTransactionRequestBody {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
