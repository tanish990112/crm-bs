import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { Login } from 'src/common/common.dto';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { AuthService } from './auth.service';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('/protect')
  getProtect() {
    console.log('ehheh');
    return true;
  }
}
