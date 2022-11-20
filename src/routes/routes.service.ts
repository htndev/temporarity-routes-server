import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { IncomingMessage } from 'http';
import * as https from 'https';
import { Readable } from 'stream';
import {
  HttpMethod,
  WorkspaceRouteResponseType,
} from '../constants/common.constant';
import { RANDOM_IMAGE_SIZES } from '../constants/routes.constant';
import { WorkspaceRoute } from '../db/entities/workspace-route.entity';
import { WorkspaceRouteResponseRepository } from '../db/repositories/workspace-route-response.repository';
import { WorkspaceRouteRepository } from '../db/repositories/workspace-route.repository';
import { WorkspaceRepository } from '../db/repositories/workspace.repository';
import { GeneratorProvider } from '../providers/generator.provider';
import { redirect } from '../utils/redirect.util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mimetype = require('mime-types');

@Injectable()
export class RoutesService {
  private readonly randomImageUrl = 'https://picsum.photos';

  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceRouteRepository: WorkspaceRouteRepository,
    private readonly workspaceRouteResponseRepository: WorkspaceRouteResponseRepository,
    private readonly generatorProvider: GeneratorProvider,
  ) {}

  async incomingRequest({
    slug,
    query,
    body,
    headers,
    request,
    method,
    response,
  }: {
    slug: string;
    query: any;
    body: any;
    headers: any;
    request: Request;
    method: HttpMethod;
    response: Response;
  }) {
    const workspace = await this.workspaceRepository.getWorkspaceBySlug(slug);
    const incomingRoute = request.params[0];
    const routes = await this.workspaceRouteRepository.getRouteByPath(
      workspace._id,
      incomingRoute,
      [method, HttpMethod.ALL],
    );

    if (!routes) {
      return this.notFoundError(incomingRoute, method);
    }

    const [routeA, routeB] = routes;

    if (routeA && !routeB) {
      return this.buildResponse(routeA, response);
    }

    if (routeA.methods.includes(HttpMethod.ALL) && routeB) {
      return this.buildResponse(routeB, response);
    }

    if (routeB.methods.includes(HttpMethod.ALL) && routeA) {
      return this.buildResponse(routeA, response);
    }

    return this.buildResponse(routeA, response);
  }

  private async buildResponse(route: WorkspaceRoute, response: Response) {
    const workspaceResponse =
      await this.workspaceRouteResponseRepository.findOne({
        where: { routeId: route._id },
      });
    response.status(route.status);

    switch (true) {
      case workspaceResponse.responseType === WorkspaceRouteResponseType.Schema:
        return response.json(
          this.generatorProvider.generate(workspaceResponse.schema),
        );
      case workspaceResponse.responseType === WorkspaceRouteResponseType.File: {
        const buffer = await this.getImage(workspaceResponse.schema as string);
        const [extension] = workspaceResponse.schema
          .toString()
          .split('.')
          .slice(-1);
        const mimeType = mimetype.lookup(extension);
        response.header('Content-Type', mimeType);
        const stream = Readable.from(buffer);
        return stream.pipe(response);
      }
      case workspaceResponse.responseType ===
        WorkspaceRouteResponseType.RandomImage:
        return redirect(response, this.randomImage());
    }
  }

  private async getImage(url: string): Promise<Buffer> {
    return this.fetchFile(url);
  }

  private fetchFile(url: string): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];

      https.get(url, (response: IncomingMessage) =>
        response
          .on('data', (chunk: Buffer) => chunks.push(chunk))
          .once('end', () => resolve(Buffer.concat(chunks))),
      );
    });
  }

  private randomImage() {
    const [width, height] =
      RANDOM_IMAGE_SIZES[
        Math.floor(Math.random() * RANDOM_IMAGE_SIZES.length)
      ].split('x');
    return `${this.randomImageUrl}/${width}/${height}`;
  }

  private async notFoundError(path: string, method: HttpMethod) {
    const errorMessage = `Route /${path} with method ${method} not found`;

    throw new NotFoundException(errorMessage);
  }
}
