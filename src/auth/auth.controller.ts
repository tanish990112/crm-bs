import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Login } from 'src/common/common.dto';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: UserDetailsDto })
  async login(@Body() userDetails: Login): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.authService.login(
        userDetails,
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

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Authorization')
  // @ApiCreatedResponse()
  async logout(@Request() req: any) {
    try {
      const { statusCode, message, data } = await this.authService.logout(
        req.user,
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
