import {
  CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import type { RequestUser } from './request-user.js';

type AuthenticatedRequest = Request & { user?: RequestUser };

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Отсутствует токен авторизации');
    }

    request.user = await this.authService.verifyAndEnsureUser(token);
    return true;
  }
}

function extractBearerToken(request: Request): string | null {
  const header = request.headers.authorization;
  if (!header) return null;

  const [type, token] = header.split(' ');
  return type === 'Bearer' ? token : null;
}
