import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { LeadService } from './lead.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeadController } from './lead.controller';

@Module({
  imports: [DbModule],
  providers: [LeadService, RolesGuard],
  controllers: [LeadController],
  exports: [LeadModule],
})
export class LeadModule {}
