import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/typeorm/TransactionsRepository';

interface ICSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

type IResponse = Transaction[];

export default class LoadCSVService {
  public async execute(filePath: string): Promise<IResponse> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const transactions: ICSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const existingCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existingCategoriesTitles = existingCategories.map(
      (category: Category) => {
        return category.title;
      },
    );

    const addCategoryTitles = categories
      .filter(category => !existingCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existingCategories];

    const transactionsToCreate = transactions.map(transaction => {
      const currentCategory = finalCategories.find(
        category => category.title === transaction.category,
      );

      if (!currentCategory) {
        throw new Error('No category was found');
      }

      return {
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: currentCategory,
      };
    });

    const createdTransactions = transactionsRepository.createFromListOfTransactions(
      transactionsToCreate,
    );

    return createdTransactions;
  }
}
