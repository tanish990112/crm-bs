import { Module } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { ActivityService } from './activity.service';
import { LoggerModule } from 'src/logger/logger.module';
import { ActivityController } from './activity.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule, LoggerModule],
  controllers: [ActivityController],
  providers: [ActivityService, RolesGuard],
  exports: [ActivityModule],
})
export class ActivityModule {}
