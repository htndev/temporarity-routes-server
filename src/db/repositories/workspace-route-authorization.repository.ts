import { Injectable } from '@nestjs/common';
import { WorkspaceRouteAuthorization } from '../entities/workspace-route-authorization.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class WorkspaceRouteAuthorizationRepository extends BaseRepository<WorkspaceRouteAuthorization> {}
