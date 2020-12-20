import { EntityRepository, Repository, getRepository } from 'typeorm';

import Category from '../../models/Category';
import ICategoriesRepository from '../ICategoriesRepository';
import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';

@EntityRepository(Category)
class TransactionsRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    /** Define ormRepository */
    this.ormRepository = getRepository(Category);
  }

  /** Método para criar instancia */
  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    /** Cria novo instância */
    const category = this.ormRepository.create(categoryData);

    /** Salva instância no banco de dados */
    await this.ormRepository.save(category);

    /** Retorna instância criada */
    return category;
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    /** Encontra instancia */
    const category = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    /** Return */
    return category;
  }
}

export default TransactionsRepository;
