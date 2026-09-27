import {
  BadRequestException,
  Body,
  ConflictException,
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
import type { Category } from '../domain/category.entity.js';
import {
  CategoryNotFoundError,
  DuplicateCategoryError,
  EmptyCategoryNameError,
} from '../domain/category.errors.js';
import { CategoriesService } from '../application/categories.service.js';
import { CurrentUser } from '../../../shared/auth/current-user.decorator.js';
import { FirebaseAuthGuard } from '../../../shared/auth/firebase-auth.guard.js';
import type { RequestUser } from '../../../shared/auth/request-user.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser): Promise<Category[]> {
    return this.service.findAll(user.userId);
  }

  @Post()
  async create(
    @CurrentUser() user: RequestUser,
    @Body() dto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.service.create(user.userId, dto.name);
    } catch (error) {
      if (error instanceof DuplicateCategoryError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof EmptyCategoryNameError) {
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
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
