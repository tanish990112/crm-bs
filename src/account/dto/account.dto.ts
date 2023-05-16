import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiPropertyOptional()
  accountName?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  accountType?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  accountOwner?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  handlerId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  foundedIn?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  rating?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  Employees?: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  billingCountry?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  billingState?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  leadId?: string;

  @IsNumber()
  @ApiPropertyOptional()
  annualRevenue?: number;

  @ApiPropertyOptional()
  @IsString()
  description?: string;
}
