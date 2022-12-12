import { Request } from 'express';

export abstract class BaseStrategy<T extends any> {
  constructor(protected readonly config: T) {}

  abstract validate(request: Request): boolean | Promise<boolean>;
}
