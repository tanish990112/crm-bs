import { Role } from '../../auth/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class Users {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  parent: number;
}
export class CreateUserDto extends Users {
  @ApiProperty()
  password: string;
}

export class UserDetailsDto extends Users {
  @ApiProperty()
  userId: number;

  @ApiPropertyOptional()
  token?: string;
}

export class UpdateUserDto extends UserDetailsDto {
  @ApiPropertyOptional()
  password?: string;
}
