import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  typeOfActivity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  activityTime: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;
}

export class ActivityDetails extends CreateActivityDto {
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  modifiedAt: Date;
}

export class UpdateActivityDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  leadId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  typeOfActivity?: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiPropertyOptional()
  activityTime?: Date;
}
