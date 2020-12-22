import { Request, Response } from 'express';
import ImportTransactionsService from '../services/ImportTransactionsService';

export default class TransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTransactionsService = new ImportTransactionsService();

    const transactions = await importTransactionsService.execute(
      request.file.path,
    );

    return response.json(transactions);
  }
}
