import { executeCommand, getCommand, isCommandString, isRepeat } from '../generators/commands-util';
import { isObject, isPrimitive } from '../utils/type-checker';
import { BaseParser } from './base.parser';
import { RootParser } from './root.parser';

export class ObjectParser extends BaseParser {
  parse(): any {
    return Object.entries(this.node).reduce((total, [key, value]: [string, any]) => {
      if (isPrimitive(value)) {
        if (!isCommandString(value)) {
          total[key] = value;
          return total;
        }

        const { name } = getCommand(value);

        if (isRepeat(name)) {
          total[key] = value;
          return total;
        }

        total[key] = executeCommand(value);
      } else {
        const parser = new RootParser(value);

        total[key] = parser.parse();
      }

      return total;
    }, {} as any);
  }

  static isType(entity: any): boolean {
    return isObject(entity);
  }
}
