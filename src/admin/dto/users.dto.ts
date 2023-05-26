import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class Users {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: string;

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
  @IsOptional()
  @ApiPropertyOptional()
  token?: string;
}

export class UpdateUserDto extends UserDetailsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;
}
