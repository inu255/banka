import { Module } from '@nestjs/common';
import { BrandsService } from './application/brands.service.js';
import { BRAND_REPOSITORY } from './domain/brand.repository.js';
import { PrismaBrandRepository } from './infrastructure/prisma-brand.repository.js';
import { BrandsController } from './presentation/brands.controller.js';

@Module({
  controllers: [BrandsController],
  providers: [
    BrandsService,
    {
      provide: BRAND_REPOSITORY,
      useClass: PrismaBrandRepository,
    },
  ],
  exports: [BrandsService],
})
export class BrandsModule {}
