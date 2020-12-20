import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/typeorm/TransactionsRepository';
import IListTransactionsResponseDTO from '../dtos/IListTransactionsResponseDTO';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,
  ) {}

  public async execute(): Promise<IListTransactionsResponseDTO> {
    /** Create category */
    const transactions = await this.transactionsRepository.findAll();

    const balance = await this.transactionsRepository.getBalance();

    /** Return transaction */
    return { transactions, balance };
  }
}

export default CreateTransactionService;
