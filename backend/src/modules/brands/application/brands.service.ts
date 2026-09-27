import { Inject, Injectable } from '@nestjs/common';
import { BRAND_REPOSITORY } from '../domain/brand.repository.js';
import type { BrandRepository } from '../domain/brand.repository.js';
import { Brand } from '../domain/brand.entity.js';
import {
  BrandNotFoundError,
  DuplicateBrandError,
  EmptyBrandNameError,
} from '../domain/brand.errors.js';

@Injectable()
export class BrandsService {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly repository: BrandRepository,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.repository.findAll();
  }

  async create(name: string): Promise<Brand> {
    const trimmed = name.trim();

    if (!trimmed) {
      throw new EmptyBrandNameError();
    }

    const existing = await this.repository.findByName(trimmed);
    if (existing) {
      throw new DuplicateBrandError(trimmed);
    }

    return this.repository.create(trimmed);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new BrandNotFoundError();
    }

    await this.repository.delete(id);
  }
}
