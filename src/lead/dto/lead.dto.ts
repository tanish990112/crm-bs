import {
  IsObject,
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import {
  CreateContactDto,
  ListContactDto,
  UpdateContactDto,
} from '../../contacts/dto/contact.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @Type(() => LeadDataDto)
  @ValidateNested({ each: true })
  leadData: LeadDataDto;

  @IsObject()
  @ApiProperty()
  @Type(() => ListContactDto)
  @ValidateNested({ each: true })
  contactInfo: ListContactDto;
}

export class UpdateLeadDto {
  @ApiProperty()
  @IsString()
  leadId: string;

  @IsObject()
  @ApiProperty()
  leadData: LeadDataDto;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  accountId?: number;

  @IsObject()
  @ApiPropertyOptional()
  contactInfo: UpdateContactDto;
}

export class AddAccount {
  @IsNumber()
  @ApiPropertyOptional()
  accountId: number;
}
