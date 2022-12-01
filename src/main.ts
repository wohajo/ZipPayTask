import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));

  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (!process.env.NODE_ENV.includes('PROD')) {
    SwaggerModule.setup(
      'explorer',
      app,
      SwaggerModule.createDocument(app, new DocumentBuilder().build()),
    );
  }

  app.enableShutdownHooks();

  await app.listen(3000);
  logger.log(`Application is listening on ${await app.getUrl()}`);
}
bootstrap();
