import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import {
  BrandNotFoundError,
  DuplicateBrandError,
  EmptyBrandNameError,
} from '../domain/brand.errors.js';
import type { BrandRepository } from '../domain/brand.repository.js';
import { BrandsService } from './brands.service.js';

function createRepositoryMock(): Mocked<BrandRepository> {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByName: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };
}

describe('BrandsService', () => {
  let repository: Mocked<BrandRepository>;
  let service: BrandsService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new BrandsService(repository);
  });

  describe('create', () => {
    it('создаёт бренд с обрезанным именем', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue({
        id: 'brand-1',
        name: 'NARS',
        createdAt: new Date(),
      });

      const result = await service.create('  NARS  ');

      expect(repository.create).toHaveBeenCalledWith('NARS');
      expect(result.name).toBe('NARS');
    });

    it('кидает ошибку на пустое имя и не пишет в репозиторий', async () => {
      await expect(service.create('   ')).rejects.toBeInstanceOf(
        EmptyBrandNameError,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('запрещает дубликат имени', async () => {
      repository.findByName.mockResolvedValue({
        id: 'brand-1',
        name: 'NARS',
        createdAt: new Date(),
      });

      await expect(service.create('NARS')).rejects.toBeInstanceOf(
        DuplicateBrandError,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('удаляет бренд', async () => {
      repository.findById.mockResolvedValue({
        id: 'brand-1',
        name: 'NARS',
        createdAt: new Date(),
      });

      await service.delete('brand-1');

      expect(repository.delete).toHaveBeenCalledWith('brand-1');
    });

    it('кидает ошибку, если бренд не найден', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('brand-1')).rejects.toBeInstanceOf(
        BrandNotFoundError,
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
