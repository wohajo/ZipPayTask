import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';

const logger = new Logger('DatabaseModule');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      //eslint-disable-next-line
      // @ts-ignore
      useFactory: (config: ConfigService) => {
        const ormConfig = {
          type: 'postgres',
          database: config.get('POSTGRES_DB'),
          host: config.get('POSTGRES_HOST'),
          port: config.get('POSTGRES_PORT'),
          username: config.get('POSTGRES_USER'),
          password: config.get('POSTGRES_PASSWORD'),
          schema: config.get('POSTGRES_SCHEMA'),
          entities: [config.get('rootDir') + '**/*.entity.{ts,js}'],
          synchronize: !config.get('prod'),
          logging: true,
          logger: 'file',
          migrations: ['dist/migrations/*.js'],
          cli: {
            migrationsDir: 'src/migrations',
          },
        };
        if (process.argv.includes('--export-typeorm-config')) {
          writeFileSync(
            config.get('rootDir') + 'ormconfig.json',
            JSON.stringify(ormConfig, null, 2),
          );
          logger.log(`Exported TypeORM config. Exiting...`);
          process.exit(0);
        }
        return ormConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
