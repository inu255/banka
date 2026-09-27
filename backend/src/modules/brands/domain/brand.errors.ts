// Доменные ошибки: application-слой кидает их, presentation-слой маппит в HTTP.
// Так сервис не знает про Nest/HTTP.
export class EmptyBrandNameError extends Error {
  constructor() {
    super('Название бренда не может быть пустым');
    this.name = 'EmptyBrandNameError';
  }
}

export class DuplicateBrandError extends Error {
  constructor(name: string) {
    super(`Бренд "${name}" уже существует`);
    this.name = 'DuplicateBrandError';
  }
}

export class BrandNotFoundError extends Error {
  constructor() {
    super('Бренд не найден');
    this.name = 'BrandNotFoundError';
  }
}
