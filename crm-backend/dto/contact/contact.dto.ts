import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateContactDto {
  create: ListContactDto;
}

export class ListContactDto {
  @IsString()
  @ApiProperty()
  contactFirstName: string;

  @IsString()
  @ApiProperty()
  contactLastName: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEmail()
  @ApiProperty()
  skypeId: string;
}
