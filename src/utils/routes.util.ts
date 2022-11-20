import { ObjectID } from 'typeorm';
import { HttpMethod, Placeholder } from '../constants/common.constant';
import { URLLayer } from './url-layer.util';

export const getSuitableRoute = (
  routeA: URLLayer | undefined,
  routeB: URLLayer | undefined,
  original: URLLayer,
) => {
  if (routeA === undefined) {
    return routeB;
  } else if (routeB === undefined) {
    return routeA;
  }

  if (routeA.value === original.value && routeB.value !== original.value) {
    return routeA;
  } else if (
    routeB.value === original.value &&
    routeA.value !== original.value
  ) {
    return routeB;
  } else if (routeA.value > routeB.value) {
    return routeA;
  } else if (routeA.value < routeB.value) {
    return routeB;
  } else if (
    routeB.value === routeA?.value &&
    routeB.value === original.value
  ) {
    for (let i = 0; i < routeB.schema.length; i++) {
      const schemaPart = original?.schema[i];
      const routeAPart = routeA?.schema[i];
      const routeBPart = routeB?.schema[i];

      const type = schemaPart.type;

      if ([Placeholder.Wildcard, Placeholder.Param].includes(type)) {
        if (
          schemaPart.type === routeBPart.type &&
          schemaPart.type === routeAPart.type
        ) {
          continue;
        } else if (schemaPart.type === routeBPart.type) {
          return routeB;
        } else if (schemaPart.type === routeAPart.type) {
          return routeA;
        }
      } else {
        if (
          schemaPart.part === routeBPart.part &&
          schemaPart.part === routeAPart.part
        ) {
          continue;
        } else if (schemaPart.part === routeBPart.part) {
          return routeB;
        } else if (schemaPart.part === routeAPart.part) {
          return routeA;
        }
      }
    }

    return routeB;
  }

  return routeA;
};

export const isSuitableRoute = (
  routeLayer: URLLayer,
  originalRoute: URLLayer,
): boolean => {
  if (routeLayer.schema.length !== originalRoute.schema.length) {
    return false;
  }

  for (const [index, route] of originalRoute.schema.entries()) {
    const schema = originalRoute.schema[index];

    if (schema.type === Placeholder.Wildcard) {
      const regex = new RegExp(
        routeLayer.schema[index].part.replace('*', '.*'),
      );

      if (!regex.test(route.part)) {
        return false;
      }
    } else if (route.type === Placeholder.Word) {
      if (route.part !== schema.part) {
        return false;
      }
    }
  }

  return true;
};

export const buildRoutePath = (path: string): string =>
  path.replace(/\/$/, '').replace(/^\//, '');

export const buildRoutePattern = (route: string): RegExp =>
  new RegExp(
    `^${route.replace(/:[^/]+/g, '[^/]+').replace(/\*{1}/g, '[^/]+')}`,
  );

export class Route {
  constructor(
    public id: ObjectID,
    public path: string,
    public methods: HttpMethod[],
    public status: number,
  ) {}
}
