import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
  ActivityDetails,
  CreateActivityDto,
  UpdateActivityDto,
} from './dto/activity.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { APIResponse } from 'src/common/response';
import { Constants } from 'src/common/constants';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('createActivity')
  @ApiCreatedResponse({ type: ActivityDetails })
  async createEvents(@Body() activityInfo: CreateActivityDto) {
    try {
      const { statusCode, message, data } =
        await this.activityService.createActivity(activityInfo);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Get('allActivity')
  @ApiOkResponse({ type: [ActivityDetails] })
  async getAllActivity(): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } =
        await this.activityService.getAllActivities();
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Get('getActivityDetails')
  @ApiOkResponse({ type: ActivityDetails })
  async getActivityById(
    @Query('activityId') activityId: number,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } =
        await this.activityService.getParticularActivity(+activityId);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Patch('updateActivity')
  async updateEvent(
    @Query('activityId') activityId: number,
    @Body() toUpdate: UpdateActivityDto,
  ) {
    try {
      const { statusCode, message, data } =
        await this.activityService.updateActivity(+activityId, toUpdate);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }
}
