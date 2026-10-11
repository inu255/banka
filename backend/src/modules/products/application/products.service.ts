import { Inject, Injectable } from '@nestjs/common';
import type {
  CreateProductInput,
  Product,
  ProductShort,
} from '../domain/product.entity.js';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.js';
import type { ProductRepository } from '../domain/product.repository.js';
import {
  EmptyProductNameError,
  ProductNotFoundError,
} from '../domain/product.errors.js';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  async findAll(userId: string): Promise<Product[]> {
    return this.repository.findManyByUserId(userId);
  }

  async findById(userId: string, id: string): Promise<Product> {
    const product = await this.repository.findByIdAndUserId(userId, id);
    if (!product) {
      throw new ProductNotFoundError();
    }
    return product;
  }

  async findByCategory(
    userId: string,
    categoryId: string,
  ): Promise<ProductShort[]> {
    return this.repository.findByCategoryAndUserId(userId, categoryId);
  }

  async create(userId: string, input: CreateProductInput): Promise<Product> {
    const name = input.name.trim();

    if (!name) {
      throw new EmptyProductNameError();
    }

    return this.repository.create(userId, { ...input, name });
  }
}
