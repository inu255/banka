import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { firebaseAuth } from './firebase-admin.js';
import type { RequestUser } from './request-user.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // Проверяет Firebase ID Token и гарантирует, что у нас есть строка User.
  // Возвращает внутренний id (cuid) — с ним дальше работает всё приложение.
  async verifyAndEnsureUser(idToken: string): Promise<RequestUser> {
    const decoded = await firebaseAuth.verifyIdToken(idToken);

    const user = await this.prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {},
      create: { firebaseUid: decoded.uid },
    });

    return { userId: user.id };
  }
}
