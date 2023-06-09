import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Login } from 'src/common/common.dto';
import { Constants } from 'src/common/constants';
import { APIResponse } from 'src/common/response';
import { MyLogger } from 'src/logger/logger.service';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private myLogger: MyLogger) {}

  @Post('login')
  @ApiCreatedResponse({ type: UserDetailsDto })
  async login(@Body() userDetails: Login): Promise<APIResponse | null> {
    try {
      const { statusCode, message, data } = await this.authService.login(
        userDetails,
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
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        null,
      );
    }
  }
}
