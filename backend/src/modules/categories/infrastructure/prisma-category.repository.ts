import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service.js';
import type { Category } from '../domain/category.entity.js';
import type { CategoryRepository } from '../domain/category.repository.js';

interface CategoryRow {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: string): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
    return rows.map(toDomain);
  }

  async findByIdAndUserId(
    userId: string,
    id: string,
  ): Promise<Category | null> {
    const row = await this.prisma.category.findFirst({
      where: { id, userId },
    });
    return row ? toDomain(row) : null;
  }

  async findByNameAndUserId(
    userId: string,
    name: string,
  ): Promise<Category | null> {
    const row = await this.prisma.category.findUnique({
      where: { userId_name: { userId, name } },
    });
    return row ? toDomain(row) : null;
  }

  async create(userId: string, name: string): Promise<Category> {
    const row = await this.prisma.category.create({
      data: { userId, name },
    });
    return toDomain(row);
  }

  async delete(userId: string, id: string): Promise<void> {
    // deleteMany (а не delete) — чтобы удаление было в скоупе пользователя.
    await this.prisma.category.deleteMany({ where: { id, userId } });
  }
}

function toDomain(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    userId: row.userId,
    createdAt: row.createdAt,
  };
}
