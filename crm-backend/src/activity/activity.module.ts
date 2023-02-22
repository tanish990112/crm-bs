import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [DbModule],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityModule],
})
export class ActivityModule {}
