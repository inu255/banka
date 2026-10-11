import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { AuthModule } from './shared/auth/auth.module.js';
import { BrandsModule } from './modules/brands/brands.module.js';
import { ProductsModule } from './modules/products/products.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CategoriesModule,
    BrandsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
