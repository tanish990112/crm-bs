import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto } from './dto/users.dto';
import { Constants } from 'src/common/constants';
@Injectable()
export class AdminService {
  constructor(private prisma: DbService) {}

  async getUsers() {
    try {
      const users = await this.prisma.leadSourcer.findMany({
        select: {
          email: true,
          name: true,
          userId: true,
          phone: true,
        },
      });
      if (users.length)
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.success,
          data: users,
        };
      else {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.failure,
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const checkUser = await this.prisma.leadSourcer.findFirst({
        where: {
          email: data.email,
        },
      });

      if (checkUser)
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.userExist,
          data: data,
        };
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const user = await this.prisma.leadSourcer.create({ data });
      delete user.password;
      if (!user) {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.failure,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.success,
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
