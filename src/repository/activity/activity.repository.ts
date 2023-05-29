import { Injectable } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';
import { DbService } from '../../db/db.service';

@Injectable()
export class ActivityRepository {
  constructor(private prisma: DbService) {}

  async createActivity(query: Prisma.ActivityCreateArgs): Promise<Activity> {
    try {
      const createdActivity = await this.prisma.activity.create({
        ...query,
      });
      return createdActivity;
    } catch (error) {
      throw error;
    }
  }

  async findActivities(
    query: Prisma.ActivityFindManyArgs,
  ): Promise<Activity[]> {
    try {
      const activityData = await this.prisma.activity.findMany({ ...query });
      return activityData;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueActivityBy(
    query: Prisma.ActivityFindUniqueArgs,
  ): Promise<Activity> {
    try {
      const activityDetails = await this.prisma.activity.findUnique({
        ...query,
      });
      return activityDetails;
    } catch (error) {
      throw error;
    }
  }

  async updateActivity(query: Prisma.ActivityUpdateArgs): Promise<Activity> {
    try {
      const updatedActivity = await this.prisma.activity.update({
        ...query,
      });
      return updatedActivity;
    } catch (error) {
      throw error;
    }
  }
}
