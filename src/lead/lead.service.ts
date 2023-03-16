import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Constants } from 'src/common/constants';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { ListLeadDto } from './dto/lead.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeadService {
  constructor(private prisma: DbService) {}

  async getLeads(
    paginateQuery: { skip?: number; take?: number },
    userInfo: UserDetailsDto,
  ) {
    try {
      if (userInfo && userInfo.role === Constants.roles.admin) {
        const leadsData = await this.prisma.lead.findMany({
          skip: paginateQuery?.skip,
          take: paginateQuery?.take,
          select: selectLeadDetails,
        });
        if (!leadsData.length) {
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: [],
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
        (userInfo.role === Constants.roles.staff ||
          userInfo.role === Constants.roles.user)
      ) {
        if (userInfo.role === Constants.roles.staff) {
          const getAllChilds = await this.prisma.users.findMany({
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
              statusCode: Constants.statusCodes.OK,
              message: Constants.messages.SUCCESS,
              data: [],
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
        } else if (userInfo.role === Constants.roles.user) {
          const leadsData = await this.prisma.lead.findMany({
            where: {
              leadSourcerUserId: userInfo.userId,
            },
            select: selectLeadDetails,
          });
          if (!leadsData.length) {
            return {
              statusCode: Constants.statusCodes.OK,
              message: Constants.messages.SUCCESS,
              data: [],
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
      if (userInfo && userInfo.role === Constants.roles.admin) {
        const query = {
          leadId: leadIdToQuery,
        };
        const leadInfo = await getLeadInformation(this.prisma, query);

        if (!leadInfo) {
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
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
        (userInfo.role === Constants.roles.user ||
          userInfo.role === Constants.roles.staff)
      ) {
        if (userInfo.role === Constants.roles.staff) {
          const getAllChilds = await this.prisma.users.findMany({
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
              message: Constants.messages.SUCCESS,
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
        } else if (userInfo.role === Constants.roles.staff) {
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
              message: Constants.messages.SUCCESS,
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

  async createLead(leadInformation: ListLeadDto) {
    try {
      const { leadData, contactInfo } = leadInformation;

      const getContactInfo = await this.prisma.contact.findFirst({
        where: {
          email: contactInfo.email,
          phone: contactInfo.phone,
        },
      });

      if (getContactInfo) {
        const getLeadForContact = await this.prisma.lead.findFirst({
          where: { leadId: getContactInfo.leadId },
        });

        if (
          getLeadForContact &&
          getLeadForContact.company == leadData.company
        ) {
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.LEAD_EXIST,
            data: getLeadForContact,
          };
        }
      }

      const leadInfo: Prisma.LeadUncheckedCreateInput = {
        ...leadData,
        leadId: uuidv4(),
        contact: {
          create: { ...contactInfo },
        },
      };

      const createLead = await this.prisma.lead.create({
        data: leadInfo,
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

  async updateLead(leadId: string, data: any) {
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
