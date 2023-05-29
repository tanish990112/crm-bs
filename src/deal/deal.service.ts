import { Injectable } from '@nestjs/common';
import { Constants } from 'src/common/constants';
import { DealRepository } from 'src/repository/deal/deal.repository';
import { CreateDealDto } from './dto/deal.dto';

@Injectable()
export class DealService {
  constructor(private dealRepository: DealRepository) {}

  async createDeal(data: CreateDealDto) {
    try {
      const creatingDeal = await this.dealRepository.createDeal({ data });
      if (creatingDeal.dealId) {
        return {
          statusCode: Constants.statusCodes.CREATED,
          message: Constants.messages.SUCCESS,
          data: creatingDeal,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: data,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllDeals() {
    try {
      const gettingAllDeals = await this.dealRepository.getAllDeals({
        select: dealSelectData,
      });
      if (gettingAllDeals.length > 0) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: gettingAllDeals,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.NO_DATA_FOUND,
          data: null,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getDeal(id: string) {
    try {
      const dealId = parseInt(id);
      const deal = await this.dealRepository.getDeal({
        where: { dealId },
        select: dealSelectData,
      });
      if (deal?.dealId) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: deal,
        };
      } else
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.NO_DATA_FOUND,
          data: null,
        };
    } catch (error) {
      throw error;
    }
  }

  async updateDeal(id: string, data: any) {
    try {
      const dealId = parseInt(id);
      const dealUpdation = await this.dealRepository.updateDeal({
        where: { dealId },
        data: data,
      });
      if (dealUpdation?.dealId)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: dealUpdation,
        };
      else
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: data,
        };
    } catch (error) {
      throw error;
    }
  }

  async deleteDeal(id: string) {
    try {
      const dealId = parseInt(id);
      const deletingDeal = await this.dealRepository.deleteDeal({
        where: { dealId },
      });
      if (deletingDeal) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: deletingDeal,
        };
      } else
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: { dealId },
        };
    } catch (error) {
      throw error;
    }
  }
}

const dealSelectData = {
  dealId: true,
  dealOwner: true,
  dealName: true,
  closedById: true,
  resourceDeployed: true,
  accountName: true,
  type: true,
  leadSource: true,
  closingDate: true,
  projectEndedOn: true,
  stage: true,
  revenueGenerated: true,
  description: true,
};
