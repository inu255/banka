import type {
  CreateProductInput,
  Product,
  ProductShort,
} from './product.entity.js';

// DI-токен: application-слой зависит от интерфейса, а не от Prisma-реализации.
export const PRODUCT_REPOSITORY = Symbol('ProductRepository');

export interface ProductRepository {
  findManyByUserId(userId: string): Promise<Product[]>;
  findByIdAndUserId(userId: string, id: string): Promise<Product | null>;
  findByCategoryAndUserId(
    userId: string,
    categoryId: string,
  ): Promise<ProductShort[]>;
  create(userId: string, input: CreateProductInput): Promise<Product>;
}
