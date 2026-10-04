import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../../../shared/auth/firebase-auth.guard.js';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('products')
export class ProductsController {}
