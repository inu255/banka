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
import { FirebaseAuthGuard } from '../../../shared/auth/firebase-auth.guard.js';
import { BrandsService } from '../application/brands.service.js';
import type { Brand } from '../domain/brand.entity.js';
import {
  BrandNotFoundError,
  DuplicateBrandError,
  EmptyBrandNameError,
} from '../domain/brand.errors.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';

@ApiTags('brands')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  @Get()
  findAll(): Promise<Brand[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() dto: CreateBrandDto): Promise<Brand> {
    try {
      return await this.service.create(dto.name);
    } catch (error) {
      if (error instanceof DuplicateBrandError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof EmptyBrandNameError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
