import { Injectable } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { DbService } from '../../db/db.service';

@Injectable()
export class LeadRepository {
  constructor(private prisma: DbService) {}

  async findLeads(query: Prisma.LeadFindManyArgs): Promise<Lead[]> {
    try {
      const leadsData = await this.prisma.lead.findMany({
        ...query,
      });
      return leadsData;
    } catch (error) {
      throw error;
    }
  }

  async findUnique(query: Prisma.LeadFindUniqueArgs): Promise<Lead> {
    try {
      const leadDetails = await this.prisma.lead.findUnique({
        ...query,
      });
      return leadDetails;
    } catch (error) {
      throw error;
    }
  }

  async findFirstOrThrow(
    query: Prisma.LeadFindFirstOrThrowArgs,
  ): Promise<Lead> {
    try {
      const leadInfo = await this.prisma.lead.findFirstOrThrow({ ...query });
      return leadInfo;
    } catch (error) {
      throw error;
    }
  }

  async createLead(query: Prisma.LeadCreateArgs) {
    try {
      const createLead = await this.prisma.lead.create({
        ...query,
      });
      return createLead;
    } catch (error) {
      throw error;
    }
  }

  async updateLeadDetails(query: Prisma.LeadUpdateArgs) {
    try {
      const leadUpdated = await this.prisma.lead.update({
        ...query,
      });
      return leadUpdated;
    } catch (error) {
      throw error;
    }
  }

  async updateMultipleLeads(query: Prisma.LeadUpdateManyArgs) {
    try {
      const leadsUpdated = await this.prisma.lead.updateMany({ ...query });
      return leadsUpdated;
    } catch (error) {
      throw error;
    }
  }
}
