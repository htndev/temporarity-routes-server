import { COMMANDS } from '../generators/get-commands-map';
export type Nullable<T> = T | null;

export type CookiesType = Record<string, string | number | boolean>;

export type PossibleContent = number | string | boolean;

export type ContentType = Record<string, Record<string, PossibleContent> | PossibleContent>;

export type Boxed<T> = T | T[];

export type MappedCommandType = typeof COMMANDS[0];

export interface Instance<T> {
  new (...args: any[]): T;
}
