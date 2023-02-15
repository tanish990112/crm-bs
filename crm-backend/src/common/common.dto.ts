import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
  @IsNumber()
  @ApiPropertyOptional()
  skip?: number;

  @IsNumber()
  @ApiPropertyOptional()
  take?: number;
}
