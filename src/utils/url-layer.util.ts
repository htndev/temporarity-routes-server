import { Placeholder } from './../constants/common.constant';

interface URLSchema {
  part: string;
  type: Placeholder;
  value: number;
  index: number;
}

const PLACEHOLDER_VALUE = {
  [Placeholder.Param]: 10,
  [Placeholder.Wildcard]: 100,
  [Placeholder.Word]: 1000,
};

const getValue = (value: string) => {
  switch (true) {
    case value.includes('*'):
      return PLACEHOLDER_VALUE[Placeholder.Wildcard];
    case value.startsWith(':'):
      return PLACEHOLDER_VALUE[Placeholder.Param];
    default:
      return PLACEHOLDER_VALUE[Placeholder.Word];
  }
};

const getTypeByValue = (value: number) => {
  switch (value) {
    case PLACEHOLDER_VALUE['*']:
      return '*';
    case PLACEHOLDER_VALUE[':']:
      return ':';
    default:
      return 'word';
  }
};

export class URLLayer {
  path: string;
  schema: URLSchema[];

  constructor(path: string) {
    this.path = path;
    this.schema = this.parsePath(path);
  }

  get value(): number {
    return this.schema.reduce((result, part) => result + part.value, 0);
  }

  private parsePath(path: string): URLSchema[] {
    const schema = path.split('/').reduce((result, part, index) => {
      const value = getValue(part);

      return [
        ...result,
        {
          part,
          index,
          type: getTypeByValue(value),
          value: getValue(part),
        },
      ];
    }, []);

    return schema;
  }
}
