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
        LeadSourcer: true,
        leadSourcerUserId: true,
        contact: true,
        activity: true,
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

  //   async users(params: {
  //     skip?: number;
  //     take?: number;
  //     cursor?: Prisma.UserWhereUniqueInput;
  //     where?: Prisma.UserWhereInput;
  //     orderBy?: Prisma.UserOrderByWithRelationInput;
  //   }): Promise<User[]> {
  //     const { skip, take, cursor, where, orderBy } = params;
  //     return this.prisma.user.findMany({
  //       skip,
  //       take,
  //       cursor,
  //       where,
  //       orderBy,
  //     });
  //   }

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

  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }): Promise<User> {
  //     const { where, data } = params;
  //     return this.prisma.user.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //     return this.prisma.user.delete({
  //       where,
  //     });
  //   }
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
      LeadSourcer: true,
      leadSourcerUserId: true,
      contact: true,
      activity: true,
    },
  });
  return leadDetails;
};
