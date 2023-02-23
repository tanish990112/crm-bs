import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
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

@Controller('activity')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('createActivity')
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiCreatedResponse({ type: ActivityDetails })
  async createEvents(
    @Request() req: any,
    @Body() activityInfo: CreateActivityDto,
  ) {
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
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: [ActivityDetails] })
  async getAllActivity(@Request() req: any): Promise<APIResponse | null> {
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
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiOkResponse({ type: ActivityDetails })
  async getActivityById(
    @Request() req: any,
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
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  async updateEvent(
    @Request() req: any,
    @Body() toUpdate: UpdateActivityDto,
    @Query('activityId') activityId: number,
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
