import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserDetailsDto, UsersDto } from './dto/users.dto';
import { Config } from 'src/common/common.config';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/common/constants';
@Injectable()
export class AdminService {
  constructor(private prisma: DbService) {}

  async getUsers(): Promise<UsersDto[] | null> {
    const users = this.prisma.leadSourcer.findMany({
      select: {
        email: true,
        name: true,
        userId: true,
        phone: true,
      },
    });
    return users;
  }

  async createUser(data: UserDetailsDto) {
    try {
      const checkUser = await this.prisma.leadSourcer.findFirst({
        where: {
          email: data.email,
        },
      });
      if (checkUser.userId)
        return {
          statusCode: Constants.statusCodes.BAD_GATEWAY,
          message: 'User with this email already exists',
          data: data,
        };
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const user = await this.prisma.leadSourcer.create({ data });
      delete user.password;
      return {
        statusCode: Constants.statusCodes.BAD_GATEWAY,
        message: 'User with this email already exists',
        data: user,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getConfig(): Promise<any> {
    return Config;
  }
}
