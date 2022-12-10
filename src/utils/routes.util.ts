import { ObjectID } from 'typeorm';
import { HttpMethod, Placeholder } from '../constants/common.constant';
import { URLLayer } from './url-layer.util';

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
