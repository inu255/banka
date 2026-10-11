import { Injectable } from '@nestjs/common';
import type { ProductRepository } from '../domain/product.repository.js';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service.js';
import type {
  CreateProductInput,
  Product,
  ProductShort,
} from '../domain/product.entity.js';
import { Prisma } from '../../../generated/prisma/client.js';

const productInclude = {
  brand: true,
  category: true,
} satisfies Prisma.ProductInclude;
type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: string): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
      include: productInclude,
    });
    return rows.map(toDomain);
  }

  async findByIdAndUserId(userId: string, id: string): Promise<Product | null> {
    const row = await this.prisma.product.findFirst({
      where: { id, userId },
      include: productInclude,
    });
    return row ? toDomain(row) : null;
  }

  async findByCategoryAndUserId(
    userId: string,
    categoryId: string,
  ): Promise<ProductShort[]> {
    const rows = await this.prisma.product.findMany({
      where: { userId, categoryId },
      select: {
        id: true,
        name: true,
        image: true,
        brand: { select: { id: true, name: true } },
      },
      orderBy: { name: 'asc' },
    });
    return rows;
  }

  async create(userId: string, input: CreateProductInput): Promise<Product> {
    const row = await this.prisma.product.create({
      data: {
        name: input.name,
        openDate: input.openDate,
        image: input.image,
        userId,
        brandId: input.brandId,
        categoryId: input.categoryId,
      },
      include: productInclude,
    });
    return toDomain(row);
  }

  async delete(userId: string, id: string): Promise<void> {
    // deleteMany (а не delete) — чтобы удаление было в скоупе пользователя.
    await this.prisma.product.deleteMany({ where: { id, userId } });
  }
}

function toDomain(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    openDate: row.openDate,
    createdAt: row.createdAt,
    brandId: row.brandId,
    categoryId: row.categoryId,
    userId: row.userId,
    brand: { id: row.brand.id, name: row.brand.name },
    category: { id: row.category.id, name: row.category.name },
  };
}
