import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './local.stratergy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    DbModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
