import { LeadService } from './lead.service';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { LeadChangeObject } from './lead.decorator';
import { PaginateQuery } from '../common/common.dto';
import { CreateLeadDto, ListLeadDto } from './dto/lead.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  @ApiOkResponse({ type: [CreateLeadDto] })
  @UseGuards(AuthGuard('jwt'))
  async getLeads(
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
  @UseGuards(AuthGuard('jwt'))
  async getLeadDetails(
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
  @ApiCreatedResponse({ type: CreateLeadDto })
  @UseGuards(AuthGuard('jwt'))
  async createLead(
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
