import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
  @ApiPropertyOptional()
  skip?: number;

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
