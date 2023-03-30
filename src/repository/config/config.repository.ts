import { Config } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';

@Injectable()
export class ConfigRepository {
  constructor(private prisma: DbService) {}

  async getAllConfigData(): Promise<Config[]> {
    try {
      const configData = await this.prisma.config.findMany();
      return configData;
    } catch (error) {
      throw error;
    }
  }
}
