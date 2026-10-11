import type { components } from "./api";

export { api, apiErrorMessage } from "./client";
export type { components, operations, paths } from "./api";

// Единый источник правды по типам — OpenAPI-схема бэкенда (src/shared/api/api.d.ts,
// генерируется через `npm run api:generate`). Ниже — короткие алиасы, чтобы по коду
// писать Product/Brand/..., а не components["schemas"]["..."] напрямую.
export type Product = components["schemas"]["Product"];
export type ProductShort = components["schemas"]["ProductShort"];
export type Brand = components["schemas"]["Brand"];
export type Category = components["schemas"]["Category"];
