import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { AccountService } from './account.sevice';
import { RolesGuard } from 'src/auth/roles.guard';
import { APIResponse } from 'src/common/response';
import { CreateAccountDto, updateAccountDto } from './dto/account.dto';

@Controller('account')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('createAccount')
  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @ApiCreatedResponse({ type: CreateAccountDto })
  async createAccount(@Body() accountDto: CreateAccountDto) {
    try {
      const { statusCode, message, data } =
        await this.accountService.createAccount(accountDto);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      console.log(error, '-------------');
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
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
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
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
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        null,
      );
    }
  }

  @Put('updateAccount')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: updateAccountDto })
  async updateAccount(
    @Body() toUpdate: updateAccountDto,
    @Query('accountName') accountName: string,
  ) {
    try {
      const { statusCode, message, data } =
        await this.accountService.updateAccount(accountName, toUpdate);
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        null,
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
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        null,
      );
    }
  }
}
