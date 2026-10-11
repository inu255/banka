import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
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

  @Get()
  findAll(@CurrentUser() user: RequestUser): Promise<Product[]> {
    return this.service.findAll(user.userId);
  }

  // Статический путь вместо query-параметра: один эндпоинт не может отдавать
  // разные схемы в зависимости от query, иначе Swagger/тип-кодген не выберет тип
  // ответа. 'by-category/:categoryId' объявлен раньше ':id' намеренно.
  @Get('by-category/:categoryId')
  findByCategory(
    @CurrentUser() user: RequestUser,
    @Param('categoryId') categoryId: string,
  ): Promise<ProductShort[]> {
    return this.service.findByCategory(user.userId, categoryId);
  }

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

  @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
      @CurrentUser() user: RequestUser,
      @Param('id') id: string,
    ): Promise<void> {
      try {
        await this.service.delete(user.userId, id);
      } catch (error) {
        if (error instanceof ProductNotFoundError) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
}
