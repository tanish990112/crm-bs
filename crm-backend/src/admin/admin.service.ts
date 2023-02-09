import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import { UsersDto } from 'dto/users/users.dto';
import { Config } from 'src/common/common.config';

@Injectable()
export class AdminService {
  constructor(private prisma: DbService) {}

  async getUsers(): Promise<UsersDto[] | null> {
    return this.prisma.leadSourcer.findMany({
      select: {
        email: true,
        name: true,
        userId: true,
        phone: true,
      },
    });
  }

  async createUser(
    data: Prisma.LeadSourcerCreateInput,
  ): Promise<UsersDto | null> {
    const user = await this.prisma.leadSourcer.create({ data });
    delete user.password;
    return user;
  }

  async getConfig(): Promise<any> {
    return Config;
  }
}
