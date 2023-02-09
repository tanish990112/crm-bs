import { LeadService } from './lead.service';
import { Lead as LeadModel } from '@prisma/client';
import { LeadChangeObject } from './lead.decorator';
import { PaginateQuery } from 'dto/common/common.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLeadDto, ListLeadDto } from 'dto/lead/lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  @ApiOkResponse({ type: [CreateLeadDto] })
  getLeads(@Query('query') query: PaginateQuery): Promise<LeadModel[]> {
    const response = this.leadService.getLeads(query);
    return response;
  }

  @Get('getLeadDetails')
  @ApiOkResponse({ type: CreateLeadDto })
  getLeadDetails(@Query('leadId') leadId: string): Promise<LeadModel> {
    const response = this.leadService.getLeadDetails(leadId);
    return response;
  }

  @Post('addLead')
  @ApiCreatedResponse({ type: CreateLeadDto })
  async createLead(
    @Body() lead: ListLeadDto,
    @LeadChangeObject() leadChangeObject: CreateLeadDto,
  ): Promise<LeadModel> {
    return this.leadService.createLead(leadChangeObject);
  }
}
