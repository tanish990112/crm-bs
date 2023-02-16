import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const payloadData = request?.body?.payload;

    if (payloadData) request.body = { ...payloadData };

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${request.method} ${request.path}  -----------------> ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
