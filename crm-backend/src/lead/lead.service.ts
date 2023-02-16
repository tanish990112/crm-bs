import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Lead, Prisma } from '@prisma/client';

@Injectable()
export class LeadService {
  constructor(private prisma: DbService) {}

  async getLeads(paginateQuery: {
    skip?: number;
    take?: number;
  }): Promise<Lead[] | null> {
    return this.prisma.lead.findMany({
      skip: paginateQuery?.skip,
      take: paginateQuery?.take,
      select: {
        id: true,
        leadId: true,
        linkedinUrl: true,
        employeeRatio: true,
        leadSource: true,
        employeeCount: true,
        createdAt: true,
        company: true,
        website: true,
        industry: true,
        leadStatus: true,
        hourlyRate: true,
        deployedCount: true,
        country: true,
        annualRevenue: true,
        vendorManagement: true,
        address: true,
        description: true,
        leadSourcer: true,
        leadSourcerUserId: true,
        contact: true,
        activity: true,
        accountStatus: true,
      },
    });
  }
  async getLeadDetails(leadIdToQuery: string): Promise<Lead | null> {
    try {
      const query = {
        leadId: leadIdToQuery,
      };
      const leadInfo = await getLeadInformation(this.prisma, query);
      return leadInfo;
    } catch (error) {
      throw error;
    }
  }

  async createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
    try {
      const createLead = await this.prisma.lead.create({
        data,
      });
      return createLead;
    } catch (error) {
      throw error;
    }
  }
}

const getLeadInformation = async (
  prisma: DbService,
  query: Prisma.LeadWhereUniqueInput,
) => {
  const leadDetails = await prisma.lead.findUnique({
    where: query,
    select: {
      id: true,
      leadId: true,
      linkedinUrl: true,
      employeeRatio: true,
      leadSource: true,
      employeeCount: true,
      createdAt: true,
      company: true,
      website: true,
      industry: true,
      leadStatus: true,
      hourlyRate: true,
      deployedCount: true,
      country: true,
      annualRevenue: true,
      vendorManagement: true,
      address: true,
      description: true,
      leadSourcer: true,
      leadSourcerUserId: true,
      contact: true,
      activity: true,
      accountStatus: true,
    },
  });
  return leadDetails;
};
