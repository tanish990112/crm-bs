import { Role } from './role.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEYS } from './roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }
    const userInfo = context.switchToHttp().getRequest().user;
    return requiredRoles.some((role) => userInfo?.role?.includes(role));
  }
}
