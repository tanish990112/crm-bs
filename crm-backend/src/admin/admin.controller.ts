import { AdminService } from './admin.service';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, UserDetailsDto } from './dto/users.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

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
}
