import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Lead as LeadModel, Prisma } from '@prisma/client';
import { CreateLeadDto, ListLeadDto } from 'dto/lead/lead.dto';
import { LeadChangeObject } from './lead.decorator';
import { LeadService } from './lead.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  @ApiOkResponse({ type: CreateLeadDto })
  getLeads(@Query() query: Prisma.LeadWhereUniqueInput): Promise<LeadModel> {
    const response = this.leadService.getLeads(query);
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
