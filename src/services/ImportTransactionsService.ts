// import Transaction from '../models/Transaction';

import LoadCSVService from './LoadCSVService';

class ImportTransactionsService {
  async execute(filePath: string): Promise<any[]> {
    const loadCSVService = new LoadCSVService();

    const result = await loadCSVService.execute(filePath);

    console.log({ result });
    // TODO
    return [result];
  }
}

export default ImportTransactionsService;
