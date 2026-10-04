import { Injectable } from '@nestjs/common';
import type { ProductRepository } from '../domain/product.repository.js';

@Injectable()
export class PrismaProductRepository implements ProductRepository {}
