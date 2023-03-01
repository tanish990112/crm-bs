import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [DbModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
