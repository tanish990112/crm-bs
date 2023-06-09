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
import { DealService } from './deal.service';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { APIResponse } from 'src/common/response';
import { MyLogger } from 'src/logger/logger.service';
import { CreateDealDto, updateDealDto } from './dto/deal.dto';

@ApiTags('Deal')
@Controller('deal')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DealController {
  constructor(private dealService: DealService, private myLogger: MyLogger) {}

  @Post('createDeal')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiCreatedResponse({ type: CreateDealDto })
  async createDeal(@Body() dealDto: CreateDealDto) {
    try {
      const { statusCode, message, data } = await this.dealService.createDeal(
        dealDto,
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

  @Get('allDeals')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: [CreateDealDto] })
  async getAllDeals() {
    try {
      const { statusCode, message, data } =
        await this.dealService.getAllDeals();
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
  @Get('deal')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: CreateDealDto })
  async getDeal(@Query('dealId') dealId: string) {
    try {
      const { statusCode, message, data } = await this.dealService.getDeal(
        dealId,
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

  @Patch('updateDeal')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOkResponse({ type: updateDealDto })
  async updateDeal(
    @Body() toUpdate: updateDealDto,
    @Query('dealId') dealId: string,
  ) {
    try {
      const { statusCode, message, data } = await this.dealService.updateDeal(
        dealId,
        toUpdate,
      );
      return new APIResponse(statusCode, message, data);
    } catch (error) {
      this.myLogger.error(error);
      return new APIResponse(
        Constants.statusCodes.INTERNAL_SERVER_ERROR,
        error,
        error,
      );
    }
  }

  @Delete('deleteDeal')
  @Roles(Role.ADMIN)
  async deleteDeal(@Query('dealId') dealId: string) {
    try {
      const { statusCode, message, data } = await this.dealService.deleteDeal(
        dealId,
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
