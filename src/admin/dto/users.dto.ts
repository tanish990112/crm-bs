import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Role } from '../../auth/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class Users {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: Role;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  parent: number;
}
export class CreateUserDto extends Users {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UserDetailsDto extends Users {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  token?: string;
}

export class UpdateUserDto extends UserDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  password?: string;
}
