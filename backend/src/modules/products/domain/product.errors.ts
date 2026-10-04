// Доменные ошибки: application-слой кидает их, presentation-слой маппит в HTTP.
// Так сервис не знает про Nest/HTTP.
export class EmptyProductNameError extends Error {}

export class ProductNotFoundError extends Error {}
