import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { Constants } from 'src/common/constants';
@Injectable()
export class AdminService {
  constructor(private prisma: DbService) {}

  async getUsers(userId?: number) {
    try {
      let users = null;
      if (!userId) {
        users = await this.prisma.users.findMany({
          select: userSelect,
        });
      } else {
        const userDetails = await this.prisma.users.findFirst({
          where: { userId: +userId },
          select: userSelect,
        });
        const parentDetails =
          userDetails &&
          userDetails.parent &&
          (await this.prisma.users.findUnique({
            where: { userId: userDetails.parent },
            select: {
              name: true,
            },
          }));
        users = {
          userId: userDetails.userId,
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          role: userDetails.role,
        };

        users.parent = parentDetails
          ? {
              parentId: userDetails.parent,
              parentName: parentDetails.name,
            }
          : null;
      }
      return users
        ? {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.SUCCESS,
            data: users,
          }
        : {
            statusCode: Constants.statusCodes.OK,
            message: Constants.messages.NO_DATA_FOUND,
            data: null,
          };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const checkUser = await this.prisma.users.findFirst({
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
      const user = await this.prisma.users.create({ data });
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

      const user = await this.prisma.users.update({
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
      const checkUser = await this.prisma.users.findUnique({
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

      const admin = await this.prisma.users.findFirst({
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

      const deleteUser = await this.prisma.users.delete({
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

const userSelect = {
  email: true,
  name: true,
  userId: true,
  phone: true,
  role: true,
  parent: true,
};
