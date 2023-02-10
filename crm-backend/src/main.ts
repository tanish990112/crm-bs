import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerIntegration } from './common/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await swaggerIntegration(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
