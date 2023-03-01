import { Role } from './role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEYS = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEYS, roles);
