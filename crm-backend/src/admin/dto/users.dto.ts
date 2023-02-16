import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;
}

export class UserDetailsDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class CreateUsersDto {
  @ApiProperty()
  userInfo: UserDetailsDto;
}
