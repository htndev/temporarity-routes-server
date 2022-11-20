import { Injectable } from '@nestjs/common';
import { WorkspaceRouteRequest } from '../entities/workspace-route-request.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class WorkspaceRouteRequestRepository extends BaseRepository<WorkspaceRouteRequest> {}
