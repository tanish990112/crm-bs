import {
  Body,
  Controller,
  Get,
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
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { LeadService } from './lead.service';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { PaginateQuery } from '../common/common.dto';
import { LeadChangeObject, LeadUpdateObject } from './lead.decorator';
import { CreateLeadDto, ListLeadDto, UpdateLeadDto } from './dto/lead.dto';

@Controller('lead')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.STAFF, Role.USER)
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
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
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }

  @Post('addLead')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiCreatedResponse({ type: CreateLeadDto })
  async createLead(
    @Request() req: any,
    @Body() lead: ListLeadDto,
    @LeadChangeObject() leadChangeObject: CreateLeadDto,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.leadService.createLead(
        leadChangeObject,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
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
      const { statusCode, message, data } = await this.leadService.updateLead(
        leadId,
        leadUpdateObject,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }
}
