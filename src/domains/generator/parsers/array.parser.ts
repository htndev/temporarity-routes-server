import { getRegex } from '../generators/get-commands-map';
import { isArray } from '../utils/type-checker';
import { executeCommand, getArguments, isCommandString, isRepeatCommand } from '../generators/commands-util';
import { RepeatGenerator } from '../generators/repeat.generator';
import { isPrimitive } from '../utils/type-checker';
import { BaseParser } from './base.parser';
import { RootParser } from './root.parser';

export class ArrayParser extends BaseParser {
  parse() {
    const result: any[] = [];

    for (let index = 0; index < this.node.length; index++) {
      const item = this.node[index];

      if (isPrimitive(item)) {
        if (!isCommandString(item) && !isRepeatCommand(item)) {
          result.push(item);
          continue;
        }

        if (isRepeatCommand(item)) {
          const repeatItem = this.node[index + 1];
          const repeatRegex = getRegex('repeat');
          const [arg1, arg2] = getArguments(item, repeatRegex);
          const repeatCommand = new RepeatGenerator(Number(arg1), Number(arg2), repeatItem);

          result.push(...repeatCommand.execute());
          index++;
          continue;
        }

        result.push(executeCommand(item));
      } else {
        const parser = new RootParser(item);

        result.push(parser.parse());
      }
    }

    return result;
  }

  static isType(entity: any): boolean {
    return isArray(entity);
  }
}
