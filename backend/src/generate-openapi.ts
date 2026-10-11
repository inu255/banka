import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { createOpenApiDocument } from './shared/openapi.js';

// Генерирует openapi.json без поднятия HTTP-сервера: создаём Nest-приложение,
// снимаем с него схему и закрываем.
//
// Запускать ТОЛЬКО после сборки (npm run openapi:generate делает `nest build`
// сам): Swagger CLI-плагин добавляет декораторы на этапе компиляции, поэтому
// схема снимается уже с собранного кода из dist.
async function generate(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });
  const document = createOpenApiDocument(app);

  writeFileSync('openapi.json', `${JSON.stringify(document, null, 2)}\n`);
  await app.close();
}

await generate();
