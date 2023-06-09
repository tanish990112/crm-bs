import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { AccountService } from './account.sevice';
import { RolesGuard } from 'src/auth/roles.guard';
import { APIResponse } from 'src/common/response';
import { MyLogger } from 'src/logger/logger.service';
import { CreateAccountDto, updateAccountDto } from './dto/account.dto';

@ApiTags('Account')
@Controller('account')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AccountController {
  constructor(
    private accountService: AccountService,
    private myLogger: MyLogger,
  ) {}
  @Post('createAccount')
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiCreatedResponse({ type: CreateAccountDto })
  async createAccount(@Body() accountDto: CreateAccountDto) {
    try {
      const { statusCode, message, data } =
        await this.accountService.createAccount(accountDto);
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

  @Get('allAccounts')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: [CreateAccountDto] })
  async getAllAccounts() {
    try {
      const { statusCode, message, data } =
        await this.accountService.getAllAccounts();
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

  @Get('anAccount')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: CreateAccountDto })
  async getAccount(@Query('accountName') accountName: string) {
    try {
      const { statusCode, message, data } =
        await this.accountService.getAccount(accountName);
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

  @Patch('updateAccount')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: updateAccountDto })
  async updateAccount(
    @Body() toUpdate: updateAccountDto,
    @Query('accountId') accountId: number,
  ) {
    try {
      const { statusCode, message, data } =
        await this.accountService.updateAccount(accountId, toUpdate);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        toUpdate,
      );
    }
  }

  @Delete('deleteAccount')
  @Roles(Role.ADMIN)
  async deleteAccount(@Query('accountName') accountName: string) {
    try {
      const { statusCode, message, data } =
        await this.accountService.deleteAccount(accountName);
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
