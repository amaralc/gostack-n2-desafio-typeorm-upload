import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

import TransactionController from '../controllers/TransactionController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

/** Cria instancia do multer para fazer upload */
const upload = multer(uploadConfig.multer);

const transactionController = new TransactionController();
const importTransactionsController = new ImportTransactionsController();

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.index);

transactionsRouter.post('/', transactionController.create);

transactionsRouter.delete('/:id', transactionController.delete);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
