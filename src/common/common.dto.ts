import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
  @IsNumber()
  @ApiPropertyOptional()
  skip?: number;

  @IsNumber()
  @ApiPropertyOptional()
  take?: number;
}

export class Login {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
