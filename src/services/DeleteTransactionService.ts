// import AppError from '../errors/AppError';

import { inject, injectable } from 'tsyringe';
import TransactionsRepository from '../repositories/typeorm/TransactionsRepository';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    this.transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
