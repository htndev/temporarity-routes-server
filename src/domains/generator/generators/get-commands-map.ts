import { COMMAND_MAP } from './commands-map';

const getRegex = (command: string) => new RegExp(`(${command})\\((.*)\\)`, 'i');

const mapCommands = () =>
  Object.entries(COMMAND_MAP).map(([key, value]) => ({
    name: key,
    regex: getRegex(key),
    command: value
  }));

const COMMANDS = mapCommands();

export { COMMANDS, getRegex };
