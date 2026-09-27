import { Brand } from './brand.entity.js';

// DI-токен: application-слой зависит от интерфейса, а не от Prisma-реализации.
export const BRAND_REPOSITORY = Symbol('BrandRepository');

export interface BrandRepository {
  // TODO: пагинация или типа того
  findAll(): Promise<Brand[]>;
  findById(id: string): Promise<Brand | null>;
  findByName(name: string): Promise<Brand | null>;
  create(name: string): Promise<Brand>;
  delete(id: string): Promise<void>;
}
