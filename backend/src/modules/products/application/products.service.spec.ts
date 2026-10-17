import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import {
  EmptyProductNameError,
  ProductNotFoundError,
} from '../domain/product.errors.js';
import type { CreateProductInput, Product } from '../domain/product.entity.js';
import type { ProductRepository } from '../domain/product.repository.js';
import { ProductsService } from './products.service.js';

function createRepositoryMock(): Mocked<ProductRepository> {
  return {
    findManyByUserId: vi.fn(),
    findByIdAndUserId: vi.fn(),
    findByCategoryAndUserId: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };
}

// Product — «тяжёлый» доменный тип (много полей), поэтому фикстура-хелпер
// вместо инлайна, как в brands/categories, где объекты были из 3 полей.
function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'product-1',
    name: 'NARS',
    openDate: '2026-10-16',
    image: null,
    userId: 'user-1',
    brandId: 'brand-1',
    categoryId: 'cat-1',
    brand: { id: 'brand-1', name: 'NARS' },
    category: { id: 'cat-1', name: 'Губы' },
    comment: null,
    createdAt: '2026-10-16T00:00:00.000Z',
    ...overrides,
  };
}

describe('ProductsService', () => {
  let repository: Mocked<ProductRepository>;
  let service: ProductsService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new ProductsService(repository);
  });

  describe('create', () => {
    it('создаёт продукт с обрезанным именем', async () => {
      const input: CreateProductInput = {
        name: '  NARS  ',
        brandId: 'brand-1',
        categoryId: 'cat-1',
        openDate: '2026-10-16',
        image: 'data:image/png;base64,AAAA',
        comment: 'Любимая помада',
      };
      repository.create.mockResolvedValue(
        makeProduct({ name: 'NARS', comment: 'Любимая помада' }),
      );

      const result = await service.create('user-1', input);

      // { ...input, name } — значит comment/image/... пробрасываются как есть
      expect(repository.create).toHaveBeenCalledWith('user-1', {
        ...input,
        name: 'NARS',
      });
      expect(result.name).toBe('NARS');
    });

    it('кидает ошибку на пустое имя и не пишет в репозиторий', async () => {
      await expect(
        service.create('user-1', {
          name: '   ',
          brandId: 'brand-1',
          categoryId: 'cat-1',
          openDate: '2026-10-16',
        }),
      ).rejects.toBeInstanceOf(EmptyProductNameError);
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('возвращает продукт по id', async () => {
      const product = makeProduct();
      repository.findByIdAndUserId.mockResolvedValue(product);

      const result = await service.findById('user-1', 'product-1');

      expect(repository.findByIdAndUserId).toHaveBeenCalledWith(
        'user-1',
        'product-1',
      );
      expect(result).toBe(product);
    });

    it('кидает ошибку, если продукт не найден', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.findById('user-1', 'product-1'),
      ).rejects.toBeInstanceOf(ProductNotFoundError);
    });
  });

  describe('delete', () => {
    it('удаляет продукт', async () => {
      repository.findByIdAndUserId.mockResolvedValue(makeProduct());

      await service.delete('user-1', 'product-1');

      expect(repository.delete).toHaveBeenCalledWith('user-1', 'product-1');
    });

    it('кидает ошибку, если продукт не найден', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.delete('user-1', 'product-1'),
      ).rejects.toBeInstanceOf(ProductNotFoundError);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
