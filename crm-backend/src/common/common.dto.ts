import { IsNumber, IsString } from 'class-validator';
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
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
