import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
  activity,
  createActivityDto,
  updateActivityDto,
} from 'dto/activity/activity.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { APIResponse } from 'src/common/response';
import { Constants } from 'src/common/constants';

@Controller('activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('createActivity')
  @ApiCreatedResponse({ type: activity })
  async createEvents(@Body() activityInfo: createActivityDto) {
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
  @ApiOkResponse({ type: [activity] })
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
  @ApiOkResponse({ type: activity })
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
    @Body() toUpdate: updateActivityDto,
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
