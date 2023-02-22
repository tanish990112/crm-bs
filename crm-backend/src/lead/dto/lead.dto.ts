import {
  CreateContactDto,
  ListContactDto,
} from '../../contacts/dto/contact.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, IsNumber } from 'class-validator';

class LeadSourcerIdDto {
  @IsNumber()
  @ApiProperty()
  userId: number;
}
class ConnectLeadSourcerDto {
  connect: LeadSourcerIdDto;
}

class LeadDataDto {
  @IsString()
  @ApiProperty()
  linkedinUrl: string;

  @IsString()
  @ApiProperty()
  employeeRatio: string;

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

export class CreateLeadDto extends LeadDataDto {
  @IsString()
  @ApiProperty()
  leadId: string;

  @IsObject()
  @ApiProperty()
  leadSourcer: ConnectLeadSourcerDto;

  @IsObject()
  @ApiProperty()
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
