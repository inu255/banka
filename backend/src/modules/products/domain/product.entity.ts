// Доменная модель. Намеренно отделена от Prisma-модели, чтобы бизнес-логика
// не была завязана на структуру таблиц БД.
//
// Это классы, а не interface: Swagger CLI-плагин строит схему по метаданным
// классов и добавляет response-декораторы из типа возврата контроллера.
// Интерфейсы в рантайме стираются и для Swagger невидимы.
// Поля не инициализируются — объекты собирает репозиторий (toDomain).

// Вложенная в ответ короткая ссылка на бренд. Отдельный класс вместо
// Pick<Brand, 'id' | 'name'>, потому что mapped-тип Swagger тоже не разворачивает.
export class BrandSummary {
  id: string;

  name: string;
}

// Аналогично BrandSummary, но для категории.
export class CategorySummary {
  id: string;

  name: string;
}

export class Product {
  id: string;

  name: string;

  openDate: string; // 'YYYY-MM-DD'

  image: string | null;

  userId: string;

  brandId: string;

  categoryId: string;

  brand: BrandSummary;

  category: CategorySummary;

  createdAt: string; // ISO-8601
}

// Короткая версия продукта для списков (например, по категории):
// только поля, которые рисует карточка.
export class ProductShort {
  id: string;

  name: string;

  image: string | null;

  brand: BrandSummary;
}

// Входные данные для создания продукта. Доменный тип без HTTP-декораторов,
// чтобы application/infrastructure не зависели от presentation-DTO.
export interface CreateProductInput {
  name: string;
  brandId: string;
  categoryId: string;
  openDate: string; // 'YYYY-MM-DD'
  image?: string;
}
