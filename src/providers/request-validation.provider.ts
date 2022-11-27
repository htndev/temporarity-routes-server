import { Strategy, getStrategy } from '../domains/request-authorization';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestValidationProvider {
  async validateRequest(
    strategyName: Strategy,
    payload: Record<string, unknown>,
    request: Request,
  ): Promise<boolean> {
    const strategy = getStrategy(strategyName, payload);

    if (!strategy) {
      return false;
    }

    return await strategy.validate(request);
  }
}
