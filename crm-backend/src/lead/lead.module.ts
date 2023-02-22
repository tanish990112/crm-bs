import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [DbModule],
  providers: [LeadService, RolesGuard],
  controllers: [LeadController],
  exports: [LeadModule],
})
export class LeadModule {}
