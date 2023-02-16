import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { Constants } from '../common/constants';

@Injectable()
export class ActivityService {
  constructor(private prisma: DbService) {}

  async createActivity(data: CreateActivityDto) {
    try {
      const activityCreated = await this.prisma.activity.create({
        data,
      });

      if (activityCreated.id) {
        return {
          statusCode: Constants.statusCodes.CREATED,
          message: Constants.messages.success,
          data: activityCreated,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.failure,
          data: data,
        };
      }
    } catch (error) {
      console.log(error, '-------------');
      throw error;
    }
  }

  async getAllActivities() {
    try {
      const allActivities = await this.prisma.activity.findMany({
        select: selectActivityData,
      });

      if (allActivities.length !== 0) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.success,
          data: allActivities,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.failure,
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getParticularActivity(id: number) {
    try {
      const query: Prisma.ActivityWhereUniqueInput = {
        id: id,
      };
      const eventData = await this.prisma.activity.findUnique({
        where: query,
        select: selectActivityData,
      });

      if (eventData && eventData.id)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.success,
          data: eventData,
        };
      else
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.failure,
          data: null,
        };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateActivity(id: number, data: UpdateActivityDto) {
    try {
      data['modifiedAt'] = new Date();
      const activityUpdation = await this.prisma.activity.update({
        where: {
          id,
        },
        data,
      });
      if (activityUpdation.id)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.success,
          data: activityUpdation,
        };
      else
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.failure,
          data: data,
        };
    } catch (error) {
      console.log(error.message, 'Error Message');
      throw error;
    }
  }
}

const selectActivityData = {
  id: true,
  leadId: true,
  description: true,
  typeOfActivity: true,
  activityTime: true,
  createdBy: true,
  createdAt: true,
  modifiedAt: true,
};
