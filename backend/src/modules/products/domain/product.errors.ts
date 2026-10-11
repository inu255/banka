// Доменные ошибки: application-слой кидает их, presentation-слой маппит в HTTP.
// Так сервис не знает про Nest/HTTP.
export class EmptyProductNameError extends Error {
  constructor() {
    super('Название продукта не может быть пустым');
    this.name = 'EmptyProductNameError';
  }
}

export class ProductNotFoundError extends Error {
  constructor() {
    super('Продукт не найден');
    this.name = 'ProductNotFoundError';
  }
}
