import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Constants } from '../common/constants';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { ActivityRepository } from 'src/repository/activity/activity.repository';

@Injectable()
export class ActivityService {
  constructor(private activityRepository: ActivityRepository) {}

  async createActivity(data: CreateActivityDto) {
    try {
      data.activityTime = moment(data.activityTime).toISOString();
      const activityCreated = await this.activityRepository.createActivity({
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
      const allActivities = await this.activityRepository.findActivities({
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

  async getParticularActivity(activityId: number) {
    try {
      const eventData = await this.activityRepository.findUniqueActivityBy({
        where: { id: activityId },
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
      data['modifiedAt'] = moment();
      const activityUpdation = await this.activityRepository.updateActivity({
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
