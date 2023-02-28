import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Constants } from 'src/common/constants';
import { UserDetailsDto } from 'src/admin/dto/users.dto';

@Injectable()
export class LeadService {
  constructor(private prisma: DbService) {}

  async getLeads(
    paginateQuery: { skip?: number; take?: number },
    userInfo: UserDetailsDto,
  ) {
    try {
      if (userInfo && userInfo.role === 'ADMIN') {
        const leadsData = await this.prisma.lead.findMany({
          skip: paginateQuery?.skip,
          take: paginateQuery?.take,
          select: selectLeadDetails,
        });
        if (!leadsData.length) {
          return {
            statusCode: Constants.statusCodes.NOT_FOUND,
            message: Constants.messages.FAILURE,
            data: null,
          };
        }
        leadsData.forEach((lead) => {
          delete lead.leadSourcer.password;
          delete lead.leadSourcer.token;
        });
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: leadsData,
        };
      } else if (
        userInfo &&
        (userInfo.role === 'STAFF' || userInfo.role === 'USER')
      ) {
        if (userInfo.role === 'STAFF') {
          const getAllChilds = await this.prisma.leadSourcer.findMany({
            where: {
              parent: userInfo.userId,
            },
            select: {
              userId: true,
            },
          });
          getAllChilds.push({ userId: userInfo.userId });
          console.log(getAllChilds, 'ALL Childs With userId');
          const id = [];
          for (const element of getAllChilds) {
            id.push(element.userId);
          }

          const leadsData = await this.prisma.lead.findMany({
            where: {
              leadSourcerUserId: { in: id },
            },
            select: selectLeadDetails,
          });
          if (!leadsData.length) {
            return {
              statusCode: Constants.statusCodes.NOT_FOUND,
              message: Constants.messages.FAILURE,
              data: null,
            };
          }
          leadsData.forEach((lead) => {
            delete lead.leadSourcer.password;
            delete lead.leadSourcer.token;
          });
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadsData,
          };
        } else if (userInfo.role === 'USER') {
          const leadsData = await this.prisma.lead.findMany({
            where: {
              leadSourcerUserId: userInfo.userId,
            },
            select: selectLeadDetails,
          });
          if (!leadsData.length) {
            return {
              statusCode: Constants.statusCodes.NOT_FOUND,
              message: Constants.messages.FAILURE,
              data: null,
            };
          }
          leadsData.forEach((lead) => {
            delete lead.leadSourcer.password;
            delete lead.leadSourcer.token;
          });
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadsData,
          };
        }
      }
    } catch (error) {
      console.log(error.message, '----------');
      throw error;
    }
  }
  async getLeadDetails(leadIdToQuery: string, userInfo: UserDetailsDto) {
    try {
      if (userInfo && userInfo.role === 'ADMIN') {
        const query = {
          leadId: leadIdToQuery,
        };
        const leadInfo = await getLeadInformation(this.prisma, query);

        if (!leadInfo) {
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.NO_LEADS,
            data: null,
          };
        }
        delete leadInfo.leadSourcer.password;
        delete leadInfo.leadSourcer.token;
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: leadInfo,
        };
      } else if (
        userInfo &&
        (userInfo.role === 'USER' || userInfo.role === 'STAFF')
      ) {
        if (userInfo.role === 'STAFF') {
          const getAllChilds = await this.prisma.leadSourcer.findMany({
            where: {
              parent: userInfo.userId,
            },
            select: { userId: true },
          });
          getAllChilds.push({ userId: userInfo.userId });
          const id = [];
          getAllChilds.forEach((element) => {
            id.push(element.userId);
          });

          const leadInfo = await this.prisma.lead.findFirstOrThrow({
            where: {
              leadId: leadIdToQuery,
              leadSourcerUserId: { in: id },
            },
            select: selectLeadDetails,
          });
          if (!leadInfo) {
            return {
              statusCode: Constants.statusCodes.OK,
              message: Constants.messages.NO_LEADS,
              data: null,
            };
          }
          delete leadInfo.leadSourcer.password;
          delete leadInfo.leadSourcer.token;
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadInfo,
          };
        } else if (userInfo.role === 'USER') {
          const leadInfo = await this.prisma.lead.findFirstOrThrow({
            where: {
              leadId: leadIdToQuery,
              leadSourcerUserId: userInfo.userId,
            },
            select: selectLeadDetails,
          });
          if (!leadInfo) {
            return {
              statusCode: Constants.statusCodes.OK,
              message: Constants.messages.NO_LEADS,
              data: null,
            };
          }
          delete leadInfo.leadSourcer.password;
          delete leadInfo.leadSourcer.token;
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadInfo,
          };
        }
      }
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
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: createLead,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateLead(leadId: string, data) {
    try {
      const leadUpdation = await this.prisma.lead.update({
        where: { leadId },
        data,
      });
      if (leadUpdation && leadUpdation.id) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: leadUpdation,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
    } catch (error) {
      console.log(error.message);
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
      select: selectLeadDetails,
    });
    return leadDetails;
  } catch (error) {
    throw error;
  }
};

const selectLeadDetails = {
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
};
