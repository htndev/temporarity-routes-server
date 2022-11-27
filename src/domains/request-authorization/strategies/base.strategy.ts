import { Request } from "express";

export abstract class BaseStrategy<T extends object | [] = {}> {
  constructor(protected readonly config: T) {}

  abstract validate(request: Request): boolean | Promise<boolean>;
}

// DB Entity
// class Strategy {
//   strategy: string;

//   config: {};
// }
