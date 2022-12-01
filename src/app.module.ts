import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import PinoPretty from 'pino-pretty';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { getAppEnv } from './constants/utils/get-app-env';

const prettyTransport: any = PinoPretty({
  hideObject: true,
  singleLine: false,
  translateTime: true,
  ignore: 'pid,hostname',
  messageFormat: (log, messageKey) => {
    const message: any = log[messageKey];
    const context = log['context'];

    if (log.requestId) return `[${log.requestId}] ${message}`;
    const messageWithContext = `[${context || 'HttpInterface'}] ${message}`;

    return messageWithContext;
  },
});

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
          customReceivedMessage: (req) => `${req.method} ${req.url}`,
          customSuccessMessage: (res) =>
            `${res.method} ${res.url} | Response: ${res.statusCode}`,
        },
        prettyTransport,
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: getAppEnv(),
      isGlobal: true,
      ignoreEnvVars: false,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        // database
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_SCHEMA: Joi.string().default('public'),
      }),
      expandVariables: true,
      load: [
        () => {
          return {
            rootDir: __dirname + '/',
            prod: process.env.NODE_ENV.includes('PROD'),
          };
        },
      ],
    }),
    UserModule,
    AccountModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
