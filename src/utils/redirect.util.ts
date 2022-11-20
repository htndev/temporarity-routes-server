import { Response } from 'express';

export const redirect = (response: Response, url: string): unknown =>
  response.redirect(url);
