import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ActivityDetails,
  CreateActivityDto,
  UpdateActivityDto,
} from './dto/activity.dto';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { ActivityService } from './activity.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('createActivity')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
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
