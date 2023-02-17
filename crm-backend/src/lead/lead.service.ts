import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import { Constants } from 'src/common/constants';

@Injectable()
export class LeadService {
  constructor(private prisma: DbService) {}

  async getLeads(paginateQuery: { skip?: number; take?: number }) {
    try {
      const leadsData = await this.prisma.lead.findMany({
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
      if (!leadsData.length) {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.failure,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.success,
        data: leadsData,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getLeadDetails(leadIdToQuery: string) {
    try {
      const query = {
        leadId: leadIdToQuery,
      };
      const leadInfo = await getLeadInformation(this.prisma, query);

      if (!leadInfo) {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.failure,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.success,
        data: leadInfo,
      };
    } catch (error) {
      throw error;
    }
  }

  async createLead(data: Prisma.LeadCreateInput) {
    try {
      const createLead = await this.prisma.lead.create({
        data,
      });
      if (!createLead) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.failure,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.success,
        data: createLead,
      };
    } catch (error) {
      throw error;
    }
  }
}

const getLeadInformation = async (
  prisma: DbService,
  query: Prisma.LeadWhereUniqueInput,
) => {
  try {
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
  } catch (error) {
    throw error;
  }
};
