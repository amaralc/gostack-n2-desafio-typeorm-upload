import { EntityRepository, Repository, getRepository } from 'typeorm';

import { classToClass } from 'class-transformer';

import Transaction from '../../models/Transaction';
import ITransactionsRepository from '../ITransactionsRepository';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import IGetBalanceResponseDTO from '../../dtos/IGetBalanceResponseDTO';
import ICreateBulkTransactionsDTO from '../../dtos/ICreateBulkTransactionsDTO';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    /** Define ormRepository como repositório de User */
    this.ormRepository = getRepository(Transaction);
  }

  /** Método para criar instancia */
  public async create(
    transactionData: ICreateTransactionDTO,
  ): Promise<Transaction> {
    /** Cria novo instância */
    const transaction = this.ormRepository.create(transactionData);

    /** Salva instância no banco de dados */
    await this.ormRepository.save(transaction);

    /** Retorna instância criada */
    return transaction;
  }

  /** Método para criar varias instancias */
  public async createFromListOfTransactions(
    listOfTransactions: ICreateBulkTransactionsDTO,
  ): Promise<Transaction[]> {
    /** Cria novo instância */
    const transactions = this.ormRepository.create(listOfTransactions);

    /** Salva instância no banco de dados */
    await this.ormRepository.save(transactions);

    /** Retorna instância criada */
    return transactions;
  }

  public async getBalance(): Promise<IGetBalanceResponseDTO> {
    /** List income transactions */
    const incomeTransactions = await this.ormRepository.find({
      where: {
        type: 'income',
      },
    });

    /** List income transactions */
    const outcomeTransactions = await this.ormRepository.find({
      where: {
        type: 'outcome',
      },
    });

    /** Sum all income transactions */
    let income = 0;
    if (incomeTransactions.length > 0) {
      income = incomeTransactions.map(a => a.value).reduce((a, b) => a + b);
    }

    /** Sum all outcome transactions */
    let outcome = 0;
    if (outcomeTransactions.length > 0) {
      outcome = outcomeTransactions.map(a => a.value).reduce((a, b) => a + b);
    }

    /** Define balance */
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    /** Return balance */
    return balance;
  }

  public async findAll(): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      relations: ['category'],
    });

    return classToClass(transactions);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TransactionsRepository;
