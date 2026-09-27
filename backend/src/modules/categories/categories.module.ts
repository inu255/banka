import { Module } from '@nestjs/common';
import { CategoriesService } from './application/categories.service.js';
import { CATEGORY_REPOSITORY } from './domain/category.repository.js';
import { PrismaCategoryRepository } from './infrastructure/prisma-category.repository.js';
import { CategoriesController } from './presentation/categories.controller.js';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
