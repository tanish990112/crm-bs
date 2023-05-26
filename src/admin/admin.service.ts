import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Constants } from 'src/common/constants';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { LeadRepository } from 'src/repository/lead/lead.repository';
import { UsersRepository } from 'src/repository/users/users.repository';
@Injectable()
export class AdminService {
  constructor(
    private userRepository: UsersRepository,
    private leadRepository: LeadRepository,
  ) {}

  async getUsers(userId?: number) {
    try {
      let users = null;
      if (!userId) {
        users = await this.userRepository.findUsers({
          select: userSelect,
        });
      } else {
        const userDetails = await this.userRepository.findUniqueBy({
          where: { userId: +userId },
          select: userSelect,
        });
        const parentDetails =
          userDetails &&
          userDetails.parent &&
          (await this.userRepository.findUniqueBy({
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
          parent: parentDetails
            ? {
                parentId: userDetails.parent,
                parentName: parentDetails.name,
              }
            : null,
        };
      }

      if (!users) {
        return {
          statusCode: Constants.statusCodes.OK,
          message: Constants.messages.NO_DATA_FOUND,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: users,
      };
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const checkUser = await this.userRepository.findUserBy({
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

      if (!Object.values(Constants.roles).includes(data.role)) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.WRONG_DATA,
          data: null,
        };
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const user = await this.userRepository.createUser({
        select: userSelect,
        data,
      });
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
      throw error;
    }
  }

  async updateUser(userData: UpdateUserDto) {
    try {
      const userToUpdate = userData && userData.userId ? userData.userId : null;

      if (!userToUpdate) {
        return {
          statusCode: Constants.statusCodes.BAD_REQUEST,
          message: Constants.messages.WRONG_DATA,
          data: null,
        };
      }

      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
      }

      delete userData.userId;
      userData?.token && delete userData.token;

      const user = await this.userRepository.updateUser({
        where: { userId: userToUpdate },
        select: userSelect,
        data: userData,
      });

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
      console.log(error);
      throw error;
    }
  }

  async deleteUser(userId: number) {
    try {
      const checkUser = await this.userRepository.findUniqueBy({
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

      const admin = await this.userRepository.findUserBy({
        where: { role: Constants.roles.admin },
      });

      if (!admin) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }

      const updateLeads = await this.leadRepository.updateMultipleLeads({
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

      const deleteUser = await this.userRepository.deleteUser({
        where: {
          userId: userId,
        },
        select: userSelect,
      });

      if (!deleteUser) {
        return {
          statusCode: Constants.statusCodes.INTERNAL_SERVER_ERROR,
          message: Constants.messages.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }
      return {
        statusCode: Constants.statusCodes.OK,
        message: Constants.messages.SUCCESS,
        data: deleteUser,
      };
    } catch (error) {
      console.log(error);
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
