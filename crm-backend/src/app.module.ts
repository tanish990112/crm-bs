import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { AdminModule } from './admin/admin.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [LeadModule, AdminModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
