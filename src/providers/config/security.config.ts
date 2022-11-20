import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { BaseConfig } from './base.config';

interface SecurityConfigProperties {
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  S3_BUCKET_NAME: string;
  S3_BUCKET_FOLDER: string;
}

@Injectable()
export class SecurityConfig extends BaseConfig<SecurityConfigProperties> {
  getSchema(): Joi.ObjectSchema<SecurityConfigProperties> {
    return Joi.object({
      S3_ACCESS_KEY_ID: Joi.string().required(),
      S3_SECRET_ACCESS_KEY: Joi.string().required(),
      S3_BUCKET_NAME: Joi.string().required(),
      S3_BUCKET_FOLDER: Joi.string().required(),
    });
  }

  get s3AccessKeyId(): string {
    return this.config.S3_ACCESS_KEY_ID;
  }

  get s3AccessSecretKey(): string {
    return this.config.S3_SECRET_ACCESS_KEY;
  }

  get s3BucketFolder(): string {
    return this.config.S3_BUCKET_FOLDER;
  }

  get s3BucketName(): string {
    return this.config.S3_BUCKET_NAME;
  }
}
