import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule as LocalConfigModule } from './providers/config/config.module';
import { DatabaseConfig } from './providers/config/database.config';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [LocalConfigModule],
      inject: [DatabaseConfig],
      useFactory: ({
        type,
        url,
        synchronize,
        database,
        dbConnectionRetryAttempts: retryAttempts,
        logging,
      }: DatabaseConfig) =>
        ({
          type,
          url,
          synchronize,
          database,
          logging,
          retryAttempts,
          entities: [`${__dirname}/db/entities/*.entity.{js,ts}`],
          useUnifiedTopology: true,
        } as TypeOrmModuleOptions),
    }),
    RoutesModule,
  ],
  providers: [{ provide: APP_PIPE, useValue: new ValidationPipe() }],
})
export class AppModule {}
