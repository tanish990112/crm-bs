import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Prisma, Account } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private prisma: DbService) {}

  async createAccount(query: Prisma.AccountCreateArgs): Promise<Account> {
    try {
      const createAccount = await this.prisma.account.create({ ...query });
      return createAccount;
    } catch (error) {
      throw error;
    }
  }

  async getAllAccounts(query: Prisma.AccountFindManyArgs) {
    try {
      const allAccounts = await this.prisma.account.findMany({ ...query });
      return allAccounts;
    } catch (error) {
      throw error;
    }
  }

  async getAccount(query: Prisma.AccountFindUniqueArgs) {
    try {
      const account = await this.prisma.account.findUnique({ ...query });
      return account;
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(query: Prisma.AccountUpdateArgs) {
    try {
      const account = this.prisma.account.update({ ...query });
      return account;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(query: Prisma.AccountDeleteArgs) {
    try {
      const account = this.prisma.account.delete({
        ...query,
      });
      return account;
    } catch (error) {
      throw error;
    }
  }
}
