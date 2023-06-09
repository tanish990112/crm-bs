import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ListLeadDto } from './dto/lead.dto';
import { Constants } from 'src/common/constants';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { CommonHelper } from 'src/common/helper/common.helper';
import { LeadRepository } from 'src/repository/lead/lead.repository';
import { ContactRepository } from 'src/repository/contacts/contacts.repository';

@Injectable()
export class LeadService {
  constructor(
    private commonHelper: CommonHelper,
    private leadRepository: LeadRepository,
    private contactRepository: ContactRepository,
  ) {}

  async getLeads(
    paginateQuery: { skip?: number; take?: number },
    userInfo: UserDetailsDto,
  ) {
    try {
      if (userInfo && userInfo.role === Constants.roles.admin) {
        const leadsData = await this.leadRepository.findLeads({
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
          const childrenIds = await this.commonHelper.getAllChildren(
            userInfo.userId,
          );

          const leadsData = await this.leadRepository.findLeads({
            where: {
              leadSourcerUserId: { in: childrenIds },
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

          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadsData,
          };
        } else if (userInfo.role === Constants.roles.user) {
          const leadsData = await this.leadRepository.findLeads({
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

          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadsData,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async getLeadDetails(leadIdToQuery: string, userInfo: UserDetailsDto) {
    try {
      if (userInfo && userInfo.role === Constants.roles.admin) {
        const leadInfo = await this.leadRepository.findUnique({
          where: { leadId: leadIdToQuery },
          select: selectLeadDetails,
        });

        if (!leadInfo) {
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: null,
          };
        }

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
          const childrenIds = await this.commonHelper.getAllChildren(
            userInfo.userId,
          );

          const leadInfo = await this.leadRepository.findFirstOrThrow({
            where: {
              leadId: leadIdToQuery,
              leadSourcerUserId: { in: childrenIds },
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
          return {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: leadInfo,
          };
        } else if (userInfo.role === Constants.roles.staff) {
          const leadInfo = await this.leadRepository.findFirstOrThrow({
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

      const getContactInfo = await this.contactRepository.findFirstBy({
        where: {
          email: contactInfo.email,
          phone: contactInfo.phone,
        },
      });

      if (getContactInfo) {
        const getLeadForContact = await this.leadRepository.findFirstOrThrow({
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

      const leadInfo = {
        ...leadData,
        leadId: uuidv4(),
        contact: {
          create: { ...contactInfo },
        },
      };

      const createLead = await this.leadRepository.createLead({
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
      console.log(error);
      throw error;
    }
  }

  async updateLead(leadId: string, updatedData: any) {
    try {
      const leadUpdate = await this.leadRepository.updateLeadDetails({
        where: { leadId },
        data: updatedData,
      });
      if (!leadUpdate) {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: leadUpdate,
      };
    } catch (error) {
      throw error;
    }
  }

  async addAccountInLead(leadId: string, updatedData: any) {
    try {
      const addingAccount = await this.leadRepository.updateLeadDetails({
        where: { leadId },
        data: updatedData,
      });
      if (!addingAccount) {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: addingAccount,
      };
    } catch (error) {
      throw error;
    }
  }
}

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
  leadSourcer: {
    select: {
      userId: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      parent: true,
    },
  },
  leadSourcerUserId: true,
  contact: true,
  activity: true,
  accountStatus: true,
};
