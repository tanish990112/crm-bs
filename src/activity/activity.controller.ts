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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
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
import { MyLogger } from 'src/logger/logger.service';

@Controller('activity')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ActivityController {
  constructor(
    private activityService: ActivityService,
    private myLogger: MyLogger,
  ) {}

  @Post('createActivity')
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiCreatedResponse({ type: ActivityDetails })
  async createActivity(@Body() activityInfo: CreateActivityDto) {
    try {
      const { statusCode, message, data } =
        await this.activityService.createActivity(activityInfo);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        null,
      );
    }
  }

  @Get('allActivity')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: [ActivityDetails] })
  @ApiQuery({ name: 'leadId', required: false, type: String })
  async getAllActivity(
    @Query('leadId') leadId?: string,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } =
        await this.activityService.getAllActivities(leadId);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        null,
      );
    }
  }

  @Get('getActivityDetails')
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
        error,
        null,
      );
    }
  }

  @Patch('updateActivity')
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiOkResponse({ type: UpdateActivityDto })
  async updateActivity(
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
        error,
        null,
      );
    }
  }
}
