/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Базовый URL бэкенда. Опциональна: без неё клиент использует
  // http://localhost:3000 (см. src/shared/api/client.ts).
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
