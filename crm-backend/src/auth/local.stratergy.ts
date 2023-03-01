import { AuthService } from './auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(userDetails: {
    username: string;
    id: number;
    role: string;
  }): Promise<any> {
    const user = await this.authService.validateUser(userDetails);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user, ' user in local strategy');
    delete user.password;
    return user;
  }
}
