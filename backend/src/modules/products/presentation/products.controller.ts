import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../../../shared/auth/firebase-auth.guard.js';
import { CurrentUser } from '../../../shared/auth/current-user.decorator.js';
import type { RequestUser } from '../../../shared/auth/request-user.js';
import type { Product, ProductShort } from '../domain/product.entity.js';
import { ProductsService } from '../application/products.service.js';
import {
  EmptyProductNameError,
  ProductNotFoundError,
} from '../domain/product.errors.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get(':id')
  async findById(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
  ): Promise<Product> {
    try {
      return await this.service.findById(user.userId, id);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  findAll(
    @CurrentUser() user: RequestUser,
    @Query('categoryId') categoryId?: string,
  ): Promise<Product[] | ProductShort[]> {
    return categoryId
      ? this.service.findByCategory(user.userId, categoryId)
      : this.service.findAll(user.userId);
  }

  @Post()
  async create(
    @CurrentUser() user: RequestUser,
    @Body() dto: CreateProductDto,
  ): Promise<Product> {
    try {
      return await this.service.create(user.userId, dto);
    } catch (error) {
      if (error instanceof EmptyProductNameError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
