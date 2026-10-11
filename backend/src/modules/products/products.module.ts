import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service.js';
import { PRODUCT_REPOSITORY } from './domain/product.repository.js';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository.js';
import { ProductsController } from './presentation/products.controller.js';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
