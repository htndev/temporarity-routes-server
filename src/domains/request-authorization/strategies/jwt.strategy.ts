import { Request } from 'express';
import { JWT } from 'node-jsonwebtoken';
import { BaseStrategy } from './base.strategy';

enum Condition {
  BePresented = 'be-presented',
  NotExpired = 'not-expired',
  BeValid = 'be-valid',
  Equals = 'equals',
}

interface BePresentedConfig {
  condition: Condition.BePresented;
  payload: { token: string };
}

interface NotExpiredConfig {
  condition: Condition.NotExpired;
  payload: { token: string };
}

interface BeValidConfig {
  condition: Condition.BeValid;
  payload: { token: string; signature: string };
}

interface EqualsConfig {
  condition: Condition.Equals;
  payload: { token: string; value: string };
}

type JwtStrategyConfig =
  | BePresentedConfig
  | NotExpiredConfig
  | BeValidConfig
  | EqualsConfig;

export class JwtStrategy extends BaseStrategy<JwtStrategyConfig> {
  async validate(request: Request): Promise<boolean> {
    const { condition, payload } = this.config;
    const bearerTokenHeader = request.headers.authorization;

    if (!bearerTokenHeader) {
      return false;
    }

    const [, token] = bearerTokenHeader.split(' ');

    switch (condition) {
      case Condition.BePresented: {
        return token !== '';
      }
      case Condition.NotExpired: {
        try {
          const decoded = JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString(),
          );

          if (typeof decoded.exp === 'undefined') {
            return true;
          }

          return decoded.exp > Date.now() / 1000;
        } catch {
          return false;
        }
      }
      case Condition.BeValid: {
        const jwtToken = new JWT(payload.signature);

        try {
          await jwtToken.verify(token);
          return true;
        } catch (e) {
          return false;
        }
      }
      case Condition.Equals: {
        return token === payload.value;
      }
      default:
        return false;
    }
  }
}
