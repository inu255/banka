import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service.js';
import type { Brand } from '../domain/brand.entity.js';
import { BrandRepository } from '../domain/brand.repository.js';

interface BrandRow {
  id: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class PrismaBrandRepository implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Brand[]> {
    const rows = await this.prisma.brand.findMany({
      orderBy: { name: 'asc' },
    });
    return rows.map(toDomain);
  }

  async findById(id: string): Promise<Brand | null> {
    const row = await this.prisma.brand.findUnique({
      where: { id },
    });
    return row ? toDomain(row) : null;
  }

  async findByName(name: string): Promise<Brand | null> {
    const row = await this.prisma.brand.findUnique({ where: { name } });
    return row ? toDomain(row) : null;
  }

  async create(name: string): Promise<Brand> {
    const row = await this.prisma.brand.create({
      data: { name },
    });
    return toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.brand.deleteMany({ where: { id } });
  }
}

function toDomain(row: BrandRow): Brand {
  return {
    id: row.id,
    name: row.name,
    // Домен хранит createdAt строкой (ISO) — сериализуемость важнее, чем Date,
    // который всё равно превратился бы в ISO-строку при JSON-ответе.
    createdAt: row.createdAt.toISOString(),
  };
}
