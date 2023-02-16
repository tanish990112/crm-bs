import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto, UserDetailsDto } from './dto/users.dto';
import { AdminService } from './admin.service';
import { APIResponse } from 'src/common/response';
import { Constants } from 'src/common/constants';

@Controller('admin')
export class AdminController {
  constructor(private adminServices: AdminService) {}

  @Get('/users')
  @ApiOkResponse({ type: [UserDetailsDto] })
  async getUsers(): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.getUsers();
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Post('/createUsers')
  @ApiCreatedResponse({ type: UserDetailsDto })
  async createUsers(
    @Body() userInfoDetails: CreateUserDto,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.createUser(
        userInfoDetails,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Get('/config')
  async getConfigs() {
    const response = this.adminServices.getConfig();
    return response;
  }
}
