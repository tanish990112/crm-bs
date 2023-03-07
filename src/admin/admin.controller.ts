import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto, UpdateUserDto, UserDetailsDto } from './dto/users.dto';

@Controller('admin')
@Roles(Role.ADMIN)
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private adminServices: AdminService) {}

  @Get('users')
  @ApiOkResponse({ type: [UserDetailsDto] })
  async getUsers(): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.getUsers();
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }

  @Post('createUsers')
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
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }

  @Post('updateUserInfo')
  @ApiCreatedResponse({ type: UserDetailsDto })
  async updateUser(
    @Body() userInfoDetails: UpdateUserDto,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.updateUser(
        userInfoDetails,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  }

  @Delete('deleteUser')
  @ApiCreatedResponse({ type: UserDetailsDto })
  async deleteUser(
    @Query('userId') userId: string,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.deleteUser(
        parseInt(userId),
      );
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
