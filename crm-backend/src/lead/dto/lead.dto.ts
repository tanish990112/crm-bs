import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsString, IsNumber } from 'class-validator';
import {
  CreateContactDto,
  ListContactDto,
} from '../../contacts/dto/contact.dto';

class LeadDataDto {
  @IsString()
  @ApiProperty()
  linkedinUrl: string;

  @IsNumber()
  @ApiProperty()
  employeeRatio: number;

  @IsString()
  @ApiProperty()
  leadSource: string;

  @IsNumber()
  @ApiProperty()
  employeeCount: number;

  @IsString()
  @ApiProperty()
  company: string;

  @IsString()
  @ApiProperty()
  website: string;

  @IsString()
  @ApiProperty()
  industry: string;

  @IsString()
  @ApiProperty()
  leadStatus: string;

  @IsNumber()
  @ApiProperty()
  hourlyRate: number;

  @IsString()
  @ApiProperty()
  country: string;

  @IsNumber()
  @ApiProperty()
  annualRevenue: number;

  @IsString()
  @ApiProperty()
  vendorManagement: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  leadSourcerUserId: number;
}

export class CreateLeadDto {
  @ApiProperty()
  leadId: string;

  @ApiProperty()
  linkedinUrl: string;

  @ApiProperty()
  employeeRatio: number;

  @ApiProperty()
  leadSource: string;

  @ApiProperty()
  employeeCount: number;

  @ApiProperty()
  company: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  industry: string;

  @ApiProperty()
  leadStatus: string;

  @ApiProperty()
  hourlyRate: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  annualRevenue: number;

  @ApiProperty()
  vendorManagement: string;

  @IsNumber()
  @ApiProperty()
  leadSourcerUserId: number;

  @IsObject()
  @ApiPropertyOptional()
  contact: CreateContactDto;
}

export class ListLeadDto {
  @IsObject()
  @ApiProperty()
  leadData: LeadDataDto;

  @IsObject()
  @ApiProperty()
  contactInfo: ListContactDto;
}
