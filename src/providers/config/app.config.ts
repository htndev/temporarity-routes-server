import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { BaseConfig } from './base.config';

interface AppConfigProperties {
  PORT: number;
}

@Injectable()
export class AppConfig extends BaseConfig<AppConfigProperties> {
  getSchema(): Joi.ObjectSchema<AppConfigProperties> {
    return Joi.object({
      PORT: Joi.number().required(),
    });
  }

  get port(): number {
    return this.config.PORT;
  }
}
