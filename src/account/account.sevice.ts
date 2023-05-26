import { Injectable } from '@nestjs/common';
import { Constants } from 'src/common/constants';
import { AccountRepository } from 'src/repository/account/account.repository';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(data: any) {
    try {
      const accountExist = await this.accountRepository.getAccount({
        where: { accountName: data.accountName },
        select: { accountId: true },
      });
      if (accountExist?.accountId) {
        return {
          statusCode: Constants.statusCodes.FORBIDDEN,
          message: Constants.messages.ACCOUNT_ALREADY_EXISTS,
          data: accountExist,
        };
      }
      const { handlerId, leadId, ...accountDataObj } = data;
      accountDataObj['handler'] = { connect: { userId: handlerId } };
      accountDataObj['leadId'] = {
        connect: { leadId: leadId },
      };
      const creatingAccount = await this.accountRepository.createAccount({
        data: accountDataObj,
      });
      if (creatingAccount?.accountId) {
        return {
          statusCode: Constants.statusCodes.CREATED,
          message: Constants.messages.SUCCESS,
          data: creatingAccount,
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

  async getAllAccounts() {
    try {
      const allAccounts = await this.accountRepository.getAllAccounts({
        select: accountSelectData,
      });
      if (allAccounts.length !== 0) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: allAccounts,
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

  async getAccount(accountName: string) {
    try {
      const account = await this.accountRepository.getAccount({
        where: { accountName: accountName },
        select: accountSelectData,
      });
      if (account?.accountId) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: account,
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

  async updateAccount(accountId: number, data: any) {
    try {
      const { handlerId, ...accountDataObj } = data;
      accountDataObj['handler'] = { connect: { userId: handlerId } };
      const accountUpdation = await this.accountRepository.updateAccount({
        where: { accountId: +accountId },
        data: data,
      });
      if (accountUpdation?.accountId)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: accountUpdation,
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

  async deleteAccount(accountName: string) {
    try {
      const deletingAccount = await this.accountRepository.deleteAccount({
        where: { accountName },
      });
      if (deletingAccount) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: deletingAccount,
        };
      } else
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: { accountName },
        };
    } catch (error) {
      throw error;
    }
  }
}

const accountSelectData = {
  accountId: true,
  accountName: true,
  accountType: true,
  accountOwner: true,
  handlerId: true,
  foundedIn: true,
  rating: true,
  Employees: true,
  billingCountry: true,
  billingState: true,
  leadId: true,
  annualRevenue: true,
  description: true,
};
