import * as Joi from 'joi';
import { DatabaseType } from 'typeorm';
import { BaseConfig } from './base.config';

interface DatabaseConfigProperties {
  DB_TYPE: DatabaseType;
  DB_URL: string;
  DB_NAME: string;
  DB_LOGGING: boolean;
  DB_SYNCHRONIZE: boolean;
  DB_CONNECTION_RETRY_ATTEMPTS: number;
}

export class DatabaseConfig extends BaseConfig<DatabaseConfigProperties> {
  getSchema(): Joi.ObjectSchema<DatabaseConfigProperties> {
    return Joi.object().append<DatabaseConfigProperties>({
      DB_TYPE: Joi.string().default('mongodb'),
      DB_URL: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      DB_LOGGING: Joi.boolean().default(false),
      DB_SYNCHRONIZE: Joi.boolean().default(false),
      DB_CONNECTION_RETRY_ATTEMPTS: Joi.number().default(5)
    });
  }

  get type(): DatabaseType {
    return this.config.DB_TYPE;
  }

  get url(): string {
    return this._config.DB_URL;
  }

  get database(): string {
    return this.config.DB_NAME;
  }

  get logging(): boolean {
    return this.config.DB_LOGGING;
  }

  get synchronize(): boolean {
    return this.config.DB_SYNCHRONIZE;
  }

  get dbConnectionRetryAttempts(): number {
    return this.config.DB_CONNECTION_RETRY_ATTEMPTS;
  }
}
