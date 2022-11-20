export const isObject = (value: any): value is Record<string, any> =>
  typeof value === 'object' && !Array.isArray(value);

export const isArray = (value: any): value is any[] => Array.isArray(value);

export const isPrimitive = (value: any) => typeof value !== 'object';
