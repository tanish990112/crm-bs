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
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { UserDetailsDto } from 'src/admin/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
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
        Constants.messages.internalSeverError,
        null,
      );
    }
  }

  @Get('/protect')
  @Roles(Role.ADMIN)
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getProtect(@Request() req: any) {
    if (req.user)
      return new APIResponse(
        Constants.statusCodes.OK,
        Constants.messages.SUCCESS,
        req.user,
      );
    else
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.internalSeverError,
        null,
      );
  }
}
