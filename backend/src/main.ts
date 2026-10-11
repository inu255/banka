import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { createOpenApiDocument } from './shared/openapi.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // фронт Vite на 5173; в проде сузить origin

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const document = createOpenApiDocument(app);
  SwaggerModule.setup('api/docs', app, document, {
    // JSON-схема по этому URL — удобно смотреть руками и отлаживать кодген.
    jsonDocumentUrl: 'api/docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
