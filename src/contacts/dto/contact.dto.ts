import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateContactDto {
  create: ListContactDto;
}

export class ListContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  contactFirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  contactLastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @Optional()
  @ApiPropertyOptional()
  skypeId?: string;
}

export class UpdateContactDto extends ListContactDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
