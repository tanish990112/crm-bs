import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeadController } from './lead.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { CommonHelper } from 'src/common/helper/common.helper';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule, LoggerModule],
  providers: [LeadService, RolesGuard, CommonHelper],
  controllers: [LeadController],
  exports: [LeadModule],
})
export class LeadModule {}
