export abstract class BaseParser<T = any> {
  constructor(protected node: T) {}

  abstract parse(): any;

  static isType(entity: any): boolean {
    return false;
  }
}
