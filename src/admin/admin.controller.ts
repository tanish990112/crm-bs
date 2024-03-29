import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { MyLogger } from 'src/logger/logger.service';
import { CreateUserDto, UpdateUserDto, UserDetailsDto } from './dto/users.dto';

@ApiTags('Admin')
@Roles(Role.ADMIN)
@Controller('admin')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(
    private adminServices: AdminService,
    private myLogger: MyLogger,
  ) {}

  @Get('users')
  @ApiQuery({ name: 'userId', required: false, type: Number })
  @ApiOkResponse({ type: [UserDetailsDto] })
  async getUsers(
    @Query('userId') userId?: string,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.getUsers(
        userId,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
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
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        null,
      );
    }
  }

  @Put('updateUserInfo')
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
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
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
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        null,
      );
    }
  }
}
