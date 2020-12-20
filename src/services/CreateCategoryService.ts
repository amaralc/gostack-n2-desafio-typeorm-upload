import AppError from '../errors/AppError';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO'
import CategoryRepository from '../repositories/typeorm/CategoriesRepository';
import Category from '../models/Category';

class CreateCategoryService {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async execute({
    title
  }: ICreateCategoryDTO): Promise<Category> {

    const lowerTitle = title.toLowerCase();

    /** Create category */
    const category = await this.categoryRepository.create({title: lowerTitle});

    /** Return category */
    return category
  }
}

export default CreateCategoryService;
