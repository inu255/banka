import type { Category } from './category.entity.js';

// DI-токен: application-слой зависит от интерфейса, а не от Prisma-реализации.
export const CATEGORY_REPOSITORY = Symbol('CategoryRepository');

export interface CategoryRepository {
  findManyByUserId(userId: string): Promise<Category[]>;
  findByIdAndUserId(userId: string, id: string): Promise<Category | null>;
  findByNameAndUserId(userId: string, name: string): Promise<Category | null>;
  create(userId: string, name: string): Promise<Category>;
  delete(userId: string, id: string): Promise<void>;
}
