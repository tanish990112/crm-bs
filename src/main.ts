import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { swaggerIntegration } from './common/swagger.config';
import { GlobalInterceptor } from './common/global.interceptor';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  app.useLogger(app.get(MyLogger));
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await swaggerIntegration(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
