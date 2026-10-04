// DI-токен: application-слой зависит от интерфейса, а не от Prisma-реализации.
export const PRODUCT_REPOSITORY = Symbol('ProductRepository');

export interface ProductRepository {}
