import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import {
  EmptyCategoryNameError,
  DuplicateCategoryError,
  CategoryNotFoundError,
} from '../domain/category.errors.js';
import type { CategoryRepository } from '../domain/category.repository.js';
import { CategoriesService } from './categories.service.js';

function createRepositoryMock(): Mocked<CategoryRepository> {
  return {
    findManyByUserId: vi.fn(),
    findByIdAndUserId: vi.fn(),
    findByNameAndUserId: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };
}

describe('CategoriesService', () => {
  let repository: Mocked<CategoryRepository>;
  let service: CategoriesService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new CategoriesService(repository);
  });

  describe('create', () => {
    it('создаёт категорию с обрезанным именем', async () => {
      repository.findByNameAndUserId.mockResolvedValue(null);
      repository.create.mockResolvedValue({
        id: 'cat-1',
        name: 'Уход',
        userId: 'user-1',
        createdAt: new Date(),
      });

      const result = await service.create('user-1', '  Уход  ');

      expect(repository.create).toHaveBeenCalledWith('user-1', 'Уход');
      expect(result.name).toBe('Уход');
    });

    it('кидает ошибку на пустое имя и не пишет в репозиторий', async () => {
      await expect(service.create('user-1', '   ')).rejects.toBeInstanceOf(
        EmptyCategoryNameError,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('запрещает дубликат имени у одного пользователя', async () => {
      repository.findByNameAndUserId.mockResolvedValue({
        id: 'cat-1',
        name: 'Уход',
        userId: 'user-1',
        createdAt: new Date(),
      });

      await expect(service.create('user-1', 'Уход')).rejects.toBeInstanceOf(
        DuplicateCategoryError,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('удаляет категорию, принадлежащую пользователю', async () => {
      repository.findByIdAndUserId.mockResolvedValue({
        id: 'cat-1',
        name: 'Уход',
        userId: 'user-1',
        createdAt: new Date(),
      });

      await service.delete('user-1', 'cat-1');

      expect(repository.delete).toHaveBeenCalledWith('user-1', 'cat-1');
    });

    it('кидает ошибку, если категория не найдена', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(service.delete('user-1', 'cat-1')).rejects.toBeInstanceOf(
        CategoryNotFoundError,
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
