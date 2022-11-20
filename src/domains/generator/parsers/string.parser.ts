import { getArguments } from '../generators/commands-util';
import { getCommand } from '../generators/commands-util';
import { BaseParser } from './base.parser';

export class StringParser extends BaseParser {
  parse() {
    const { regex, command } = getCommand(this.node);

    if (!command) {
      return this.node;
    }

    const args = getArguments(this.node, regex);

    const cmd = new command(...args);

    return cmd.execute();
  }

  static isType(entity: any): boolean {
    return typeof entity === 'string';
  }
}
