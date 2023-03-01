import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Login } from 'src/common/common.dto';
import { DbService } from 'src/db/db.service';
import { Constants } from 'src/common/constants';
import { UserDetailsDto } from 'src/admin/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: DbService) {}

  async validateUser(userDetails: {
    username: string;
    id: number;
  }): Promise<any> {
    try {
      const userData = await this.prisma.leadSourcer.findUnique({
        where: { email: userDetails.username },
      });
      if (!userData) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.INCORRECT_EMAIL,
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
      const userData = await this.prisma.leadSourcer.findUnique({
        where: { email: userDetails.email },
      });

      if (!userData) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.INCORRECT_EMAIL,
          data: null,
        };
      }
      const passwordMatch = await bcrypt.compare(
        userDetails.password,
        userData.password,
      );

      if (!passwordMatch) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.PASSWORD_INCORRECT,
          data: null,
        };
      }

      if (userData && passwordMatch) {
        const payload = { username: userData.email, id: userData.userId };
        userData.token = this.jwtService.sign(payload);
        await this.prisma.leadSourcer.update({
          where: {
            userId: userData.userId,
          },
          data: {
            token: userData.token,
          },
        });
        delete userData.password;
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: userData,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async logout(userInfo: UserDetailsDto) {
    try {
      const tokenDeletion = await this.prisma.leadSourcer.update({
        where: { userId: userInfo.userId },
        data: { token: null },
      });
      if (tokenDeletion.token !== null) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.SOMETHING_WENT_WRONG,
          data: null,
        };
      } else {
        delete tokenDeletion.password;
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.LOGOUT_SUCCESSFULL,
          data: null,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
