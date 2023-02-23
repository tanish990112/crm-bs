import {
  Body,
  Controller,
  Get,
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
import { Role } from 'src/auth/role.enum';
import { LeadService } from './lead.service';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeadChangeObject } from './lead.decorator';
import { PaginateQuery } from '../common/common.dto';
import { CreateLeadDto, ListLeadDto } from './dto/lead.dto';

@Controller('lead')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: [CreateLeadDto] })
  async getLeads(
    @Request() req: any,
    @Query('query') query: PaginateQuery,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.leadService.getLeads(
        query,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Get('getLeadDetails')
  @ApiOkResponse({ type: CreateLeadDto })
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  async getLeadDetails(
    @Request() req: any,
    @Query('leadId') leadId: string,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } =
        await this.leadService.getLeadDetails(leadId);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Post('addLead')
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
        Constants.messages.internalSeverError,
        null,
      );
    }
  }
}
