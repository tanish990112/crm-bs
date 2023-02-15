import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';

export class activity {
  @ApiProperty()
  @IsString()
  leadId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  typeOfActivity: string;

  @ApiProperty()
  @IsDate()
  activityTime: Date;

  @ApiProperty()
  @IsNumber()
  createdBy: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  modifiedAt: Date;
}

export class createActivityDto {
  @ApiProperty()
  @IsString()
  leadId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  typeOfActivity: string;

  @ApiProperty()
  @IsDate()
  activityTime: Date;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}

export class updateActivityDto {
  @ApiProperty()
  @IsString()
  leadId?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  typeOfActivity?: string;

  @ApiProperty()
  @IsDate()
  activityTime?: Date;
}
