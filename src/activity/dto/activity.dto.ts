import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
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
  @IsString()
  activityTime: string;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}

export class ActivityDetails extends CreateActivityDto {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  modifiedAt: Date;
}

export class UpdateActivityDto {
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
