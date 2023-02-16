import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUsersDto, UsersDto } from './dto/users.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminServices: AdminService) {}

  @Get('/users')
  @ApiOkResponse({ type: [UsersDto] })
  async getUsers(): Promise<UsersDto[]> {
    const response = this.adminServices.getUsers();
    return response;
  }

  @Post('/createUsers')
  @ApiCreatedResponse({ type: CreateUsersDto })
  async createUsers(
    @Body() userInfoDetails: CreateUsersDto,
  ): Promise<UsersDto> {
    const { userInfo } = userInfoDetails;
    console.log(userInfo);
    const response = this.adminServices.createUser(userInfo);
    return response;
  }

  @Get('/config')
  async getConfigs() {
    const response = this.adminServices.getConfig();
    return response;
  }
}
