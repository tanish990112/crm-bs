import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [DbModule],
  controllers: [ActivityController],
  providers: [ActivityService, RolesGuard],
  exports: [ActivityModule],
})
export class ActivityModule {}
