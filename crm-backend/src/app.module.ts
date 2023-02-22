import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [LeadModule, AdminModule, ActivityModule, DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
