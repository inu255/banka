import { Inject, Injectable } from '@nestjs/common';
import type { Category } from '../domain/category.entity.js';
import {
  CategoryNotFoundError,
  DuplicateCategoryError,
  EmptyCategoryNameError,
} from '../domain/category.errors.js';
import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
} from '../domain/category.repository.js';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
  ) {}

  async findAll(userId: string): Promise<Category[]> {
    return this.repository.findManyByUserId(userId);
  }

  async create(userId: string, name: string): Promise<Category> {
    const trimmed = name.trim();

    if (!trimmed) {
      throw new EmptyCategoryNameError();
    }

    const existing = await this.repository.findByNameAndUserId(userId, trimmed);
    if (existing) {
      throw new DuplicateCategoryError(trimmed);
    }

    return this.repository.create(userId, trimmed);
  }

  async delete(userId: string, id: string): Promise<void> {
    const existing = await this.repository.findByIdAndUserId(userId, id);
    if (!existing) {
      throw new CategoryNotFoundError();
    }

    await this.repository.delete(userId, id);
  }
}
