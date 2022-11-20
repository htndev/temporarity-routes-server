import { Injectable } from '@nestjs/common';
import { WorkspaceRouteResponse } from '../entities/workspace-route-response.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class WorkspaceRouteResponseRepository extends BaseRepository<WorkspaceRouteResponse> {}
