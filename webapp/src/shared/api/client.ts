import createClient, { type Middleware } from "openapi-fetch";
import { auth } from "src/shared/config/firebase";
import type { paths } from "./api";

// Базовый URL бэкенда. По умолчанию — локальный NestJS; переопределяется через
// VITE_API_URL (например, при деплое или для отдельного API-хоста).
const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const api = createClient<paths>({ baseUrl });

// Подставляем Firebase ID Token в каждый запрос. getIdToken() сам вернёт свежий
// токен (обновит, если истёк) — вручную рефрешить не нужно.
// Авторизация остаётся на Firebase: бэкенд проверяет токен тем же проектом.
const authorize: Middleware = {
  async onRequest({ request }) {
    const user = auth.currentUser;
    if (user) {
      request.headers.set("Authorization", `Bearer ${await user.getIdToken()}`);
    }
  },
};

api.use(authorize);

// NestJS присылает ошибки телом вида { statusCode, message, error }.
// Схемы ошибок в OpenAPI не описаны (Swagger их не выводит автоматически),
// поэтому openapi-fetch типизирует error как never — разбираем тело вручную.
export function apiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error !== "object" || error === null || !("message" in error)) {
    return fallback;
  }

  const { message } = error as { message?: unknown };

  if (typeof message === "string") {
    return message;
  }

  // ValidationPipe отдаёт message массивом строк.
  if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
    return message.join("; ");
  }

  return fallback;
}
