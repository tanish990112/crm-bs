import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Login } from 'src/common/common.dto';
import { Constants } from 'src/common/constants';
import { UserDetailsDto } from 'src/admin/dto/users.dto';
import { UsersRepository } from 'src/repository/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UsersRepository,
  ) {}

  async validateUser(userDetails: {
    username: string;
    id: number;
    role: string;
  }): Promise<any> {
    try {
      const userData = await this.userRepository.findUniqueBy({
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
      const userData = await this.userRepository.findUniqueBy({
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
      const payload = {
        username: userData.email,
        id: userData.userId,
        role: userData.role,
      };
      userData.token = this.jwtService.sign(payload);

      const updatedUser = await this.userRepository.updateUser({
        where: {
          userId: userData.userId,
        },
        data: {
          token: userData.token,
        },
        select: {
          userId: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          parent: true,
        },
      });

      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: updatedUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(userInfo: UserDetailsDto) {
    try {
      const tokenDeletion = await this.userRepository.updateUser({
        where: { userId: userInfo.userId },
        data: { token: null },
        select: {
          userId: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          parent: true,
        },
      });
      if (tokenDeletion.token !== null) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.SOMETHING_WENT_WRONG,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.LOGOUT_SUCCESSFUL,
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
