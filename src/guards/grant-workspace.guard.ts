import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../db/repositories/workspace.repository';

@Injectable()
export class GrantWorkspaceGuard implements CanActivate {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { slug } = request.params as { slug: string };

    return this.workspaceRepository.isExists({ slug });
  }
}
