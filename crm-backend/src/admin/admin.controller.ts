import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { APIResponse } from 'src/common/response';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto, UserDetailsDto } from './dto/users.dto';

@Controller('admin')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private adminServices: AdminService) {}

  @Get('/users')
  @Roles(Role.STAFF, Role.ADMIN, Role.USER)
  @ApiOkResponse({ type: [UserDetailsDto] })
  async getUsers(@Request() req: any): Promise<APIResponse | null> {
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
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiCreatedResponse({ type: UserDetailsDto })
  async createUsers(
    @Request() req: any,
    @Body() userInfoDetails: CreateUserDto,
  ): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.adminServices.createUser(
        userInfoDetails,
        req.user,
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
