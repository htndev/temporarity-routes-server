import { ArrayParser } from './array.parser';
import { BaseParser } from './base.parser';
import { ObjectParser } from './object.parser';
import { StringParser } from './string.parser';

export class RootParser extends BaseParser {
  parse() {
    const SchemaRootParser = this.getParser();
    const parser = new SchemaRootParser(this.node);
    const result = parser.parse();

    return result;
  }

  getParser(): typeof StringParser {
    switch (true) {
      case StringParser.isType(this.node):
        return StringParser;
      case ArrayParser.isType(this.node):
        return ArrayParser;
      case ObjectParser.isType(this.node):
        return ObjectParser;
      default:
        return RootParser;
    }
  }
}
