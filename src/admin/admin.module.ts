import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule, LoggerModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
