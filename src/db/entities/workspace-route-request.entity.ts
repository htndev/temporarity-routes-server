import { Column, Entity, ObjectID } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspace_route_requests' })
export class WorkspaceRouteRequest extends BaseEntity {
  @Column({ type: 'string' })
  routeId: ObjectID;
}
