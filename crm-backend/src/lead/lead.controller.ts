import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Lead as LeadModel, Prisma } from '@prisma/client';
import { CreateLeadDto } from 'dto/lead/lead.dto';
import { LeadChangeObject } from './lead.decorator';
import { LeadService } from './lead.service';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Get()
  getLeads(
    @Query() query: { skip: number; take: number },
  ): Promise<LeadModel[]> {
    const response = this.leadService.getLeads(query);
    return response;
  }
  @Get('getLeadDetails')
  getLeadDetails(
    @Query() query: Prisma.LeadWhereUniqueInput,
  ): Promise<LeadModel> {
    const response = this.leadService.getLeadDetails(query);
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
    const { leadInfo } = lead;
    return this.leadService.createLead(leadInfo);
  }
}
