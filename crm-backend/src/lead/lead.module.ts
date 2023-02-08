import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';

@Module({
  imports: [DbModule],
  providers: [LeadService],
  controllers: [LeadController],
  exports: [LeadModule],
})
export class LeadModule {}
