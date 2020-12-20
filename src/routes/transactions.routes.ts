import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

import TransactionController from '../controllers/TransactionController';

/** Cria instancia do multer para fazer upload */
const upload = multer(uploadConfig.multer);

const transactionController = new TransactionController();

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.index);

transactionsRouter.post('/', transactionController.create);

transactionsRouter.delete('/:id', transactionController.delete);

transactionsRouter.post(
  '/import',
  upload.single('csv'),
  async (request, response) => {
    // TODO
    return response.json({ ok: true });
  },
);

export default transactionsRouter;
