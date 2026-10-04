// Доменная модель. Намеренно отделена от Prisma-модели, чтобы бизнес-логика
// не была завязана на структуру таблиц БД.
export interface Product {
  id: string;
  name: string;
  openDate: Date;
  image: string;
  userId: string;
  brandId: string;
  categoryId: string;
  createdAt: Date;
}
