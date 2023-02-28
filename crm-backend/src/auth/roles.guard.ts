import { Role } from './role.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEYS } from './roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: DbService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }
    const userInfo = context.switchToHttp().getRequest().user;
    console.log(userInfo, 'Inside roles guard');
    return requiredRoles.some((role) => userInfo?.role?.includes(role));
  }
}
