import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import ICreateTransactionServiceDTO from '../dtos/ICreateTransactionServiceDTO';
import TransactionsRepository from '../repositories/typeorm/TransactionsRepository';
import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/typeorm/CategoriesRepository';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  public async execute({
    title,
    type,
    value,
    category,
  }: ICreateTransactionServiceDTO): Promise<Transaction> {
    /** Get balance */
    const balance = await this.transactionsRepository.getBalance();

    /** If balance is not enough, throw error */
    if (balance.total < value && type === 'outcome') {
      throw new AppError(
        'Your current balance is not enough to execute the transaction',
      );
    }

    /** Create category */
    let selectedCategory = await this.categoriesRepository.findByTitle(
      category,
    );

    /** If doesnt exist, create one */
    if (!selectedCategory) {
      /** Create category */
      selectedCategory = await this.categoriesRepository.create({
        title: category,
      });
    }

    /** Create transaction */
    const transaction = await this.transactionsRepository.create({
      title,
      type,
      value,
      category: selectedCategory,
    });

    /** Return transaction */
    return transaction;
  }
}

export default CreateTransactionService;
