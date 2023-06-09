import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Constants } from './common/constants';
import { APIResponse } from './common/response';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Config')
  @Get('/config')
  async getConfigs(): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.appService.getConfig();
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }
}
