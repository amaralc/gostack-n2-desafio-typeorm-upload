import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../models/Category"

export default interface ICategorysRepository {
  create(categoryData: ICreateCategoryDTO): Promise<Category>;
  findByTitle(title: string): Promise<Category| undefined> ;
}
