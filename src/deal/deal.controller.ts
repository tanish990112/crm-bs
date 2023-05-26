import { DealService } from './deal.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDealDto, updateDealDto } from './dto/deal.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Constants } from 'src/common/constants';
import { RolesGuard } from 'src/auth/roles.guard';
import { APIResponse } from 'src/common/response';
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

@Controller('Deal')
// @ApiBearerAuth('Authorization')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class DealController {
  constructor(private dealService: DealService) {}

  @Post('createDeal')
  async createDeal(@Body() dealDto: CreateDealDto) {
    try {
      const { statusCode, message, data } = await this.dealService.createDeal(
        dealDto,
      );
      console.log({ statusCode, message, data });

      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }

  @Get('allDeals')
  async getAllDeals() {
    try {
      const { statusCode, message, data } =
        await this.dealService.getAllDeals();
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }
  @Get('deal')
  // @Roles(Role.ADMIN, Role.STAFF)
  // @ApiOkResponse({ type: CreateAccountDto })
  async getDeal(@Query('dealId') dealId: number) {
    try {
      const { statusCode, message, data } = await this.dealService.getDeal(
        dealId,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      console.log(error.message);

      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        null,
      );
    }
  }

  @Patch('updateDeal')
  // @Roles(Role.ADMIN, Role.STAFF)
  // @ApiOkResponse({ type: updateAccountDto })
  async updateDeal(
    @Body() toUpdate: updateDealDto,
    @Query('dealId') dealId: number,
  ) {
    try {
      const { statusCode, message, data } = await this.dealService.updateDeal(
        dealId,
        toUpdate,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      console.log(error);

      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        error.message,
      );
    }
  }

  @Delete('deleteDeal')
  // @Roles(Role.ADMIN)
  async deleteDeal(@Query('dealId') dealId: number) {
    try {
      const { statusCode, message, data } = await this.dealService.deleteDeal(
        dealId,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      console.log(error.message);

      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        Constants.messages.FAILURE,
        null,
      );
    }
  }
}
