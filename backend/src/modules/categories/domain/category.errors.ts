// Доменные ошибки: application-слой кидает их, presentation-слой маппит в HTTP.
// Так сервис не знает про Nest/HTTP.
export class EmptyCategoryNameError extends Error {
  constructor() {
    super('Название категории не может быть пустым');
    this.name = 'EmptyCategoryNameError';
  }
}

export class DuplicateCategoryError extends Error {
  constructor(name: string) {
    super(`Категория "${name}" уже существует`);
    this.name = 'DuplicateCategoryError';
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super('Категория не найдена');
    this.name = 'CategoryNotFoundError';
  }
}
