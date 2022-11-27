import { Column, Entity, ObjectID } from 'typeorm';
import { Strategy } from './../../domains/request-authorization/index';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspace_route_authorization' })
export class WorkspaceRouteAuthorization extends BaseEntity {
  @Column({ enum: Strategy })
  strategy: Strategy;

  @Column()
  payload: any;

  @Column({ type: 'string' })
  routeId: ObjectID;
}
