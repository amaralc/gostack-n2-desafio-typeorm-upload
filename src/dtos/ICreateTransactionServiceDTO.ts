export default interface ICreateTransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
