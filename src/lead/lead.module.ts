import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeadController } from './lead.controller';
import { CommonHelper } from 'src/common/helper/common.helper';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [LeadService, RolesGuard, CommonHelper],
  controllers: [LeadController],
  exports: [LeadModule],
})
export class LeadModule {}
