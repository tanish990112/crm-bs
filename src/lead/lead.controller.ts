import {
  AddAccount,
  CreateLeadDto,
  ListLeadDto,
  UpdateLeadDto,
} from './dto/lead.dto';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { LeadService } from './lead.service';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeadUpdateObject } from './lead.decorator';
import { PaginateQuery } from '../common/common.dto';
import { MyLogger } from 'src/logger/logger.service';

@ApiTags('Lead')
@Controller('lead')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.STAFF, Role.USER)
export class LeadController {
  constructor(private leadService: LeadService, private myLogger: MyLogger) {}

  @Get('getLeads')
  @ApiOkResponse({ type: [CreateLeadDto] })
  async getLeads(
    @Request() req: any,
    @Query('query') query: PaginateQuery,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.leadService.getLeads(
        query,
        req.user,
      );
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

  @Get('getLeadDetails')
  @ApiOkResponse({ type: CreateLeadDto })
  async getLeadDetails(
    @Request() req: any,
    @Query('leadId') leadId: string,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } =
        await this.leadService.getLeadDetails(leadId, req.user);
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

  @Post('addLead')
  @ApiCreatedResponse({ type: CreateLeadDto })
  async createLead(@Body() lead: ListLeadDto): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.leadService.createLead(
        lead,
      );
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

  @Put('updateLead')
  @ApiOkResponse({ type: UpdateLeadDto })
  async updateLead(
    @Query('leadId') leadId: string,
    @Body() leadData: UpdateLeadDto,
    @LeadUpdateObject() leadUpdateObject,
  ) {
    try {
      leadData?.accountId
        ? (leadUpdateObject.accountId = leadData.accountId)
        : (leadUpdateObject = leadUpdateObject);
      const { statusCode, message, data } = await this.leadService.updateLead(
        leadId,
        leadUpdateObject,
      );
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

  @Patch('addAccount')
  async addAccountInLead(
    @Body() leadData: AddAccount,
    @Query('leadId') leadId: string,
  ) {
    try {
      const { statusCode, message, data } =
        await this.leadService.addAccountInLead(leadId, leadData);
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
}
