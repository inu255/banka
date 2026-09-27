// Доменная модель. Намеренно отделена от Prisma-модели, чтобы бизнес-логика
// не была завязана на структуру таблиц БД.
export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
}
