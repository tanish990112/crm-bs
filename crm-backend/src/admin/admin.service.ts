import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto, UserDetailsDto } from './dto/users.dto';
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
          message: Constants.messages.SUCCESS,
          data: users,
        };
      else {
        return {
          statusCode: Constants.statusCodes.NOT_FOUND,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(data: CreateUserDto, parentDetails: UserDetailsDto) {
    try {
      const checkUser = await this.prisma.leadSourcer.findFirst({
        where: {
          email: data.email,
        },
      });

      if (checkUser)
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.USER_ALREADY_EXIST,
          data: data,
        };
      if (data.role === 'ADMIN' && parentDetails.role === 'STAFF') {
        return {
          statusCode: Constants.statusCodes.UNAUTHORIZED,
          message: Constants.messages.UNAUTHORIZED,
          data: null,
        };
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      data.parent = parentDetails.userId;
      console.log(data);
      const user = await this.prisma.leadSourcer.create({ data });
      delete user.password;
      if (!user) {
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: Constants.messages.FAILURE,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
