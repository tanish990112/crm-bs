import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './local.stratergy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    RepositoryModule,
    LoggerModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
