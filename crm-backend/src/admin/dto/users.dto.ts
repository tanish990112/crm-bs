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

class ui {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

class us {
  @ApiProperty()
  userInfo: ui;
}

export class CreateUsersDto {
  @ApiProperty()
  payload: us;
}
