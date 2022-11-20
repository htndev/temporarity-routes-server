import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TEMPORARITY_API_KEY_HEADER } from '../constants/auth.constant';
import { WorkspaceRepository } from '../db/repositories/workspace.repository';

@Injectable()
export class TemporarityApiKeyGuard implements CanActivate {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers[TEMPORARITY_API_KEY_HEADER];

    if (!request.params.slug) {
      throw new BadRequestException('Missing slug');
    }

    if (!apiKey) {
      throw new UnauthorizedException('Missing API key');
    }

    const workspace = await this.workspaceRepository.findOne({
      where: { slug: request.params.slug },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (workspace.apiKey !== apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
