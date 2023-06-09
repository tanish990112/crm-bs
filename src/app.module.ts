import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { AuthModule } from './auth/auth.module';
import { DealModule } from './deal/deal.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { LoggerModule } from './logger/logger.module';
import { AccountModule } from './account/account.module';
import { ActivityModule } from './activity/activity.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    AuthModule,
    LeadModule,
    AdminModule,
    DealModule,
    LoggerModule,
    AccountModule,
    ActivityModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
