import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityModule],
})
export class ActivityModule {}
