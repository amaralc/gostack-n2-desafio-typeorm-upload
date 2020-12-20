import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactionsService';
import DeleteTransactionService from '../services/DeleteTransactionService';

export default class TransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    /** Busca provider_id e date de dentro do corpo da requisicao */
    const { title, value, type, category } = request.body;

    /** Instancia serviço utilizando container de injecao de dependencias */
    const createTransaction = container.resolve(CreateTransactionService);

    /** Executa serviço */
    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category,
    });

    /** Devolve resposta à requisição */
    return response.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    /** Instancia serviço utilizando container de injecao de dependencias */
    const listTransactions = container.resolve(ListTransactionsService);

    /** Executa serviço */
    const transactions = await listTransactions.execute();

    /** Devolve resposta à requisição */
    return response.json(transactions);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    /** Instancia serviço utilizando container de injecao de dependencias */
    const deleteTransaction = container.resolve(DeleteTransactionService);

    await deleteTransaction.execute(id);

    /** Devolve resposta à requisição */
    return response
      .status(200)
      .json({ message: 'Transaction has been deleted' });
  }
}
