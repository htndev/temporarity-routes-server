import { RootParser } from './parsers/root.parser';

export const generate = (schema: any) => {
  const parser = new RootParser(schema);

  return parser.parse();
};
