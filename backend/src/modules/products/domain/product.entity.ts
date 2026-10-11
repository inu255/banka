// Доменная модель. Намеренно отделена от Prisma-модели, чтобы бизнес-логика

import type { Brand } from '../../brands/domain/brand.entity.js';
import type { Category } from '../../categories/domain/category.entity.js';

// не была завязана на структуру таблиц БД.
export interface Product {
  id: string;
  name: string;
  openDate: string; // 'YYYY-MM-DD'
  image: string | null;
  userId: string;
  brandId: string;
  categoryId: string;
  brand: Pick<Brand, 'id' | 'name'>;
  category: Pick<Category, 'id' | 'name'>;
  createdAt: Date;
}

// Короткая версия продукта для списков (например, по категории):
// только поля, которые рисует карточка.
export interface ProductShort {
  id: string;
  name: string;
  image: string | null;
  brand: Pick<Brand, 'id' | 'name'>;
}

// Входные данные для создания продукта. Доменный тип без HTTP-декораторов,
// чтобы application/infrastructure не зависели от presentation-DTO.
export interface CreateProductInput {
  name: string;
  brandId: string;
  categoryId: string;
  openDate: string; // 'YYYY-MM-DD'
  image?: string;
}
