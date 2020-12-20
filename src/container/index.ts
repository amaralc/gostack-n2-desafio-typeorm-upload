import { container } from 'tsyringe';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import TransactionsRepository from '../repositories/typeorm/TransactionsRepository'

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import CategoriesRepository from '../repositories/typeorm/CategoriesRepository'

/** Registra mesma instância de repositório quando algum serviço chamar o id registrado entre aspas */
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

