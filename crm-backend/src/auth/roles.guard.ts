import { Role } from './role.enum';
import { Reflector } from '@nestjs/core';
import { DbService } from '../db/db.service';
import { ROLES_KEYS } from './roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: DbService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user, 'Checking Role');

    const checkedRole = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (!checkedRole) return false;
    else {
      const userDetails = await this.prisma.leadSourcer.findUnique({
        where: {
          userId: user.userId,
        },
      });
      if (userDetails && userDetails.role === user.role) {
        return true;
      } else return false;
    }
  }
}
