export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL',
}

export enum Placeholder {
  Wildcard = '*',
  Param = ':',
  Word = 'word',
}

export enum WorkspaceRouteResponseType {
  Schema = 'schema',
  File = 'file',
  RandomImage = 'random-image',
}

export type Boxed<T> = T | T[];

export type PossibleContent = number | string | boolean;

export type ContentType =
  | Boxed<Record<string, Record<string, PossibleContent> | PossibleContent>>
  | string;
