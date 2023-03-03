import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerIntegration = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bonami CRM-Backend')
    .setDescription(
      'This is a CRM server (Customer Relationship Management) of Bonami Software.',
    )
    .setVersion('1.0')
    .addBearerAuth(undefined, 'Authorization')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document);
};
