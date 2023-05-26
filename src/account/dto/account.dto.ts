import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountOwner: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  handlerId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  foundedIn: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  rating: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Employees: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  billingCountry: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  billingState: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  leadId: string;

  @IsNumber()
  @ApiProperty()
  annualRevenue: number;

  @ApiPropertyOptional()
  @IsString()
  description?: string;
}

export class updateAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  accountName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  accountType?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  accountOwner?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  handlerId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  foundedIn?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  rating?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  Employees?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  billingCountry?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  billingState?: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiPropertyOptional()
  // leadId?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  annualRevenue?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;
}
