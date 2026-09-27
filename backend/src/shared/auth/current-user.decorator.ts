import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { RequestUser } from './request-user.js';

// Достаёт пользователя, которого положил в request guard.
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestUser => {
    return ctx.switchToHttp().getRequest().user;
  },
);
