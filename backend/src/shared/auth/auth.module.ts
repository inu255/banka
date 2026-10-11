import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { FirebaseAuthGuard } from './firebase-auth.guard.js';

// @Global, чтобы любой фичевый модуль мог использовать FirebaseAuthGuard
// без повторного импорта AuthModule (как PrismaModule).
@Global()
@Module({
  providers: [AuthService, FirebaseAuthGuard],
  exports: [AuthService, FirebaseAuthGuard],
})
export class AuthModule {}
