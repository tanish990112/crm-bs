import { Module } from '@nestjs/common';
import { AccountService } from './account.sevice';
import { AccountController } from './account.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountModule],
})
export class AccountModule {}
