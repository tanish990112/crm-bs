import { Injectable } from '@nestjs/common';
import { Deal, Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DealRepository {
  constructor(private prisma: DbService) {}

  async createDeal(query: Prisma.DealCreateArgs): Promise<Deal> {
    try {
      const creatingDeal = await this.prisma.deal.create({ ...query });
      console.log(creatingDeal);
      return creatingDeal;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getAllDeals(query?: Prisma.DealFindManyArgs) {
    try {
      const allDeals = await this.prisma.deal.findMany({ ...query });
      return allDeals;
    } catch (error) {
      throw error;
    }
  }
  async getDeal(query: Prisma.DealFindUniqueArgs) {
    try {
      const deal = await this.prisma.deal.findUnique({ ...query });
      return deal;
    } catch (error) {
      throw error;
    }
  }

  async updateDeal(query: Prisma.DealUpdateArgs) {
    try {
      const deal = this.prisma.deal.update({ ...query });
      return deal;
    } catch (error) {
      throw error;
    }
  }

  async deleteDeal(query: Prisma.DealDeleteArgs) {
    try {
      const deal = this.prisma.deal.delete({
        ...query,
      });
      return deal;
    } catch (error) {
      throw error;
    }
  }
}
