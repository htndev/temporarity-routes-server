import { JwtStrategy } from './strategies/jwt.strategy';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { BaseStrategy } from './strategies/base.strategy';

export enum Strategy {
  JWT = 'jwt',
  API_KEY = 'api-key',
  NONE = 'none',
}

interface InstanceType<T> {
  new (...args: any[]): T;
}

export const strategies = new Map<Strategy, InstanceType<BaseStrategy>>([
  [Strategy.JWT, JwtStrategy],
  [Strategy.API_KEY, ApiKeyStrategy],
]);

export const getStrategy = <T extends Record<string, unknown> | []>(
  strategyName: Strategy,
  payload: T,
): BaseStrategy | null => {
  const GuardStrategy = strategies.get(strategyName);

  if (!GuardStrategy) {
    return null;
  }

  const guardStrategy = new GuardStrategy(payload);

  return guardStrategy;
};
