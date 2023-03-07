import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
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
          role: true,
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

  async createUser(data: CreateUserDto) {
    try {
      const checkUser = await this.prisma.leadSourcer.findFirst({
        where: {
          OR: [{ email: data.email }, { phone: data.phone }],
        },
      });

      if (checkUser)
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.USER_ALREADY_EXIST,
          data: null,
        };

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
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

  async updateUser(data: UpdateUserDto) {
    try {
      const userToUpdate = data && data.userId ? data.userId : null;

      if (!userToUpdate) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.WRONG_DATA,
          data: null,
        };
      }

      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
      }

      delete data.userId;
      data?.token && delete data.token;

      const user = await this.prisma.leadSourcer.update({
        where: { userId: userToUpdate },
        data: data,
      });
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

  async deleteUser(userId: number) {
    try {
      const checkUser = await this.prisma.leadSourcer.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!checkUser) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.WRONG_DATA,
          data: null,
        };
      }

      const admin = await this.prisma.leadSourcer.findFirst({
        where: { role: Constants.roles.admin },
      });

      if (!admin) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }

      const updateLeads = await this.prisma.lead.updateMany({
        where: { leadSourcerUserId: checkUser.userId },
        data: { leadSourcerUserId: admin.userId },
      });

      if (!updateLeads) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }

      const deleteUser = await this.prisma.leadSourcer.delete({
        where: {
          userId: userId,
        },
      });

      if (!deleteUser) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }
      delete deleteUser.password;
      delete deleteUser.token;
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: deleteUser,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
