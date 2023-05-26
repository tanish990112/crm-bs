import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { LeadRepository } from './lead/lead.repository';
import { DealRepository } from './deal/deal.repository';
import { UsersRepository } from './users/users.repository';
import { ConfigRepository } from './config/config.repository';
import { AccountRepository } from './account/account.repository';
import { ContactRepository } from './contacts/contacts.repository';
import { ActivityRepository } from './activity/activity.repository';

@Module({
  imports: [DbModule],
  providers: [
    LeadRepository,
    UsersRepository,
    ConfigRepository,
    ContactRepository,
    ActivityRepository,
    AccountRepository,
    DealRepository,
  ],
  exports: [
    LeadRepository,
    UsersRepository,
    ConfigRepository,
    ContactRepository,
    ActivityRepository,
    AccountRepository,
    DealRepository,
  ],
})
export class RepositoryModule {}
