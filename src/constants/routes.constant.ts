import { HttpMethod } from './common.constant';

export const ALLOWED_HTTP_METHODS = [
  HttpMethod.GET,
  HttpMethod.POST,
  HttpMethod.PUT,
  HttpMethod.DELETE,
  HttpMethod.PATCH,
  HttpMethod.OPTIONS,
  HttpMethod.HEAD,
];

export const ROUTE_SEPARATOR = '/';

export const RANDOM_IMAGE_SIZES = [
  '200x200',
  '300x300',
  '400x400',
  '500x500',
  '600x600',
  '200x300',
  '300x200',
  '400x500',
  '500x400',
  '600x700',
  '1920x1080',
  '1080x1920',
  '800x600',
  '600x800',
  '1024x768',
  '768x1024',
  '1280x720',
  '720x1280',
  '1280x1024',
  '1024x1280',
  '1600x1200',
  '1200x1600',
];
