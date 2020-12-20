import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTransactionService from '../services/CreateTransactionService';

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
}
