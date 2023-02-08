import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Lead as LeadModel, Prisma } from '@prisma/client';
import { CreateLeadDto } from 'dto/lead/lead.dto';
import { LeadChangeObject } from './lead.decorator';
import { LeadService } from './lead.service';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get('getLeads')
  getLeads(@Query() query: Prisma.LeadWhereUniqueInput): Promise<LeadModel> {
    const response = this.leadService.getLeads(query);
    return response;
  }

  @Post('addLead')
  async createLead(
    @LeadChangeObject() leadInformation: any,
    @Body()
    lead: {
      leadInfo: CreateLeadDto;
    },
  ): Promise<LeadModel> {
    // leadInformation;
    const { leadInfo } = lead;
    return this.leadService.createLead(leadInfo);
  }
}
