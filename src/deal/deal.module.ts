import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule, LoggerModule],
  controllers: [DealController],
  providers: [DealService],
  exports: [DealModule],
})
export class DealModule {}
