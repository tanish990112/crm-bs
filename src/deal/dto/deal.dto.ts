import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDealDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dealOwner: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dealName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  closedById: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  resourceDeployed: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  leadSource: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  closingDate: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value))
  projectEndedOn: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  stage: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  revenueGenerated: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;
}

export class updateDealDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  dealOwner?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  dealName?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  closedById?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  resourceDeployed?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  accountName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  type?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  leadSource?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  closingDate?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value))
  projectEndedOn?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  stage?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  revenueGenerated: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;
}
