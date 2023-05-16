import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { ActivityModule } from './activity/activity.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    AuthModule,
    LeadModule,
    AdminModule,
    ActivityModule,
    AccountModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
