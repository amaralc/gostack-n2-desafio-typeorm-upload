import { injectable, inject, container } from 'tsyringe';

import AppError from '../errors/AppError';

import ICreateTransactionServiceDTO from '../dtos/ICreateTransactionServiceDTO'
import TransactionsRepository from '../repositories/typeorm/TransactionsRepository';
import Transaction from '../models/Transaction';
import FindCategoryByTitle from './FindCategoryIdByTitleService';
import CreateCategoryService from './CreateCategoryService';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,
    ) {}

  public async execute({
    title,
    type,
    value,
    category
  }: ICreateTransactionServiceDTO): Promise<Transaction> {

    /** Get balance */
    const balance = await this.transactionsRepository.getBalance();

    /** If balance is not enough, throw error */
    if (balance.total < value && type === 'outcome') {
      throw new AppError(
        'Your current balance is not enough to execute the transaction',
      );
    }

    /** Instancia serviço utilizando container de injecao de dependencias */
    const findCategoryByTitle = container.resolve(
      FindCategoryByTitle,
    );

    /** Find category */
    let selectedCategory = await findCategoryByTitle.execute({title: category})

    /** If doesnt exist, create one */
    if(!selectedCategory){

      /** Initialize service */
      const createCategoryService = container.resolve(CreateCategoryService)

      /** Create category */
      selectedCategory = await createCategoryService.execute({title: category})

    }

    /** Define category id */
    const category_id = selectedCategory.id

    /** Create transaction */
    const transaction = await this.transactionsRepository.create({
      title,
      type,
      value,
      category_id
    });

    /** Return transaction */
    return transaction;
  }
}

export default CreateTransactionService;
