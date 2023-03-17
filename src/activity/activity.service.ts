import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Constants } from '../common/constants';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import * as moment from 'moment';

@Injectable()
export class ActivityService {
  constructor(private prisma: DbService) {}

  async createActivity(data: CreateActivityDto) {
    try {
      data.activityTime = moment(data.activityTime).toISOString();
      const activityCreated = await this.prisma.activity.create({
        data,
      });

      if (activityCreated.id) {
        return {
          statusCode: Constants.statusCodes.CREATED,
          message: Constants.messages.SUCCESS,
          data: activityCreated,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: data,
        };
      }
    } catch (error) {
      console.log(error, '-------------');
      throw error;
    }
  }

  async getAllActivities(leadId: string) {
    try {
      const allActivities = await this.prisma.activity.findMany({
        where: { leadId: leadId },
        select: selectActivityData,
      });

      if (allActivities.length !== 0) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: allActivities,
        };
      } else {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.NO_DATA_FOUND,
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
          message: Constants.messages.SUCCESS,
          data: eventData,
        };
      else
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.NO_DATA_FOUND,
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
      if (activityUpdation && activityUpdation.id)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.SUCCESS,
          data: activityUpdation,
        };
      else
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
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
  lead: true,
  leadId: true,
  description: true,
  typeOfActivity: true,
  activityTime: true,
  createdBy: true,
  createdAt: true,
  modifiedAt: true,
};
