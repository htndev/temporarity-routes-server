import { MappedCommandType } from '../utils/base.type';
import { COMMANDS } from './get-commands-map';

export const isCommandString = (string: string) =>
  typeof string === 'string' &&
  string?.startsWith('{{') &&
  string?.endsWith('}}') &&
  COMMANDS.some(({ regex }) => regex.test(string));

export const getCommand = (string: string) =>
  COMMANDS.find(({ regex }) => regex.test(string)) || ({} as MappedCommandType);

export const isRepeatCommand = (command: string) => /{{repeat.*}}/gi.test(command);

export const isRepeat = (command: string): command is 'repeat' => command === 'repeat';

export const getArguments = (string: string, regex: RegExp) => {
  const [_, __, args] = String(string).match(regex) || [];
  const safeArgs = args?.split(/\,/) || [];

  return safeArgs.filter((arg) => arg !== '');
};

export const executeCommand = (string: string) => {
  const { regex, command } = getCommand(string);

  const args = getArguments(string, regex);

  const cmd = new command(...args);

  return cmd.execute();
};
