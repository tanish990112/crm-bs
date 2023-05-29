import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { UpdateUserDto, UserDetailsDto } from 'src/admin/dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: DbService) {}
  async findUsers(query: Prisma.UsersFindManyArgs): Promise<UserDetailsDto[]> {
    try {
      const usersData = await this.prisma.users.findMany({
        ...query,
      });

      return usersData;
    } catch (error) {
      throw error;
    }
  }

  async findUserBy(query: Prisma.UsersFindFirstArgs): Promise<UserDetailsDto> {
    try {
      const usersData = await this.prisma.users.findFirst({
        ...query,
      });

      return usersData;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueBy(
    query: Prisma.UsersFindUniqueArgs,
  ): Promise<UpdateUserDto> {
    try {
      const userDetails = await this.prisma.users.findUnique({
        ...query,
      });
      return userDetails;
    } catch (error) {
      throw error;
    }
  }

  async createUser(query: Prisma.UsersCreateArgs): Promise<UserDetailsDto> {
    try {
      const updatedUser = await this.prisma.users.create({
        ...query,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(query: Prisma.UsersUpdateArgs): Promise<UserDetailsDto> {
    try {
      const updatedUser = await this.prisma.users.update({
        ...query,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(query: Prisma.UsersDeleteArgs): Promise<UserDetailsDto> {
    try {
      const deletedUser = await this.prisma.users.delete({ ...query });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
