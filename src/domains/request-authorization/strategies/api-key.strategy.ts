import { Request } from 'express';
import { BaseStrategy } from './base.strategy';

interface ApiKeyConfig {
  apiKeyQueryParam: string;
  apiKey: string;
}

export class ApiKeyStrategy extends BaseStrategy<ApiKeyConfig> {
  validate(request: Request): boolean {
    const { apiKeyQueryParam, apiKey } = this.config;

    const requestApiKey = request.query[apiKeyQueryParam];

    return requestApiKey === apiKey;
  }
}
