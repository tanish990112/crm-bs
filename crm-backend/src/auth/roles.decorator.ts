import { Role } from './role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEYS = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEYS, roles);
