import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/common/common.dto';
import { DbService } from 'src/db/db.service';
import { Constants } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: DbService) {}

  async validateUser(userDetails: {
    username: string;
    id: number;
  }): Promise<any> {
    try {
      const userData = await this.prisma.leadSourcer.findUniqueOrThrow({
        where: { email: userDetails.username },
      });
      if (!userData) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.LOGIN_FAILED,
          data: null,
        };
      }
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async login(userDetails: Login) {
    try {
      const userData = await this.prisma.leadSourcer.findUniqueOrThrow({
        where: { email: userDetails.email },
      });

      if (!userData) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.LOGIN_FAILED,
          data: null,
        };
      }
      const passwordMatch = await bcrypt.compare(
        userDetails.password,
        userData.password,
      );
      const responseData = {
        ...userData,
        token: null,
      };
      if (userData && passwordMatch) {
        const payload = { username: userData.email, id: userData.userId };
        responseData.token = this.jwtService.sign(payload);
        delete responseData.password;
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: responseData,
      };
    } catch (error) {}
  }
}
