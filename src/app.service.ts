import { Injectable } from '@nestjs/common';
import { Constants } from 'src/common/constants';
import { ConfigRepository } from './repository/config/config.repository';

@Injectable()
export class AppService {
  constructor(private configRepository: ConfigRepository) {}
  async getConfig() {
    try {
      const configData = await this.configRepository.getAllConfigData();

      const config = {};

      for await (const conf of configData) {
        if (config.hasOwnProperty(conf.type)) {
          config[conf.type].push(conf);
        } else {
          config[conf.type] = [conf];
        }
      }
      if (!Object.keys(config).length) {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: config,
      };
    } catch (error) {
      throw error;
    }
  }
}
