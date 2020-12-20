import AppError from '../errors/AppError';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO'
import CategoryRepository from '../repositories/typeorm/CategoriesRepository'
import Category from '../models/Category'

class FindCategoryByTitle {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async execute({
    title
  }: ICreateCategoryDTO): Promise<Category | undefined> {

    /** Converte title to lowercase */
    const lowerTitle = title.toLowerCase();

    /** Checa se existe categoria registrada */
    const category = await this.categoryRepository.findByTitle(lowerTitle);

    /** Se nao existe, retorna undefined */
    if(!category){
      return undefined
    }

    /** Se existe, retorna categoria */
    return category
  }
}

export default FindCategoryByTitle;
