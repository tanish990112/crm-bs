import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Users {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;
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
