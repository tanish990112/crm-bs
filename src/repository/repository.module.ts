import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { LeadRepository } from './lead/lead.repository';
import { UsersRepository } from './users/users.repository';
import { ConfigRepository } from './config/config.repository';
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
  ],
  exports: [
    LeadRepository,
    UsersRepository,
    ConfigRepository,
    ContactRepository,
    ActivityRepository,
  ],
})
export class RepositoryModule {}
