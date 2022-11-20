import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

enum LogLevel {
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
}

interface BaseConfigProperties {
  NODE_ENV: string;
  LOG_LEVEL: LogLevel;
}

@Injectable()
export abstract class BaseConfig<T = unknown> {
  protected readonly _config: Partial<T> = {};

  constructor() {
    const schema = this.getSchema().append({
      NODE_ENV: Joi.string().default('development'),
      LOG_LEVEL: Joi.string()
        .valid(
          LogLevel.DEBUG,
          LogLevel.ERROR,
          LogLevel.LOG,
          LogLevel.VERBOSE,
          LogLevel.WARN,
        )
        .default(LogLevel.ERROR),
    });

    this._config = BaseConfig.validateConfig(process.env, schema);
  }

  abstract getSchema(): Joi.ObjectSchema<T>;

  private static validateConfig(config: unknown, schema: Joi.ObjectSchema) {
    const { error, value } = schema.validate(config, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value;
  }

  get config(): T {
    return this._config as T;
  }

  get isDevMode(): boolean {
    return (
      (this.config as Partial<BaseConfigProperties>).NODE_ENV === 'development'
    );
  }

  get isDebugMode(): boolean {
    return (
      (this.config as Partial<BaseConfigProperties>).LOG_LEVEL ===
      LogLevel.DEBUG
    );
  }
}
