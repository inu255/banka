import type { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  type OpenAPIObject,
} from '@nestjs/swagger';

// Единая точка сборки OpenAPI-документа. Используется и рантаймом (Swagger UI
// в main.ts), и скриптом генерации схемы (generate-openapi.ts), чтобы конфиг
// документа не разъезжался между ними.
export function createOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Banka API')
    .setDescription('API для учёта косметики')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, config);
}