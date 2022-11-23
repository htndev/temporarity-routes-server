import {
  ContentType,
  WorkspaceRouteResponseType,
} from '../../constants/common.constant';
import { Column, Entity, ObjectID } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspace_route_response' })
export class WorkspaceRouteResponse extends BaseEntity {
  @Column({ type: 'string' })
  routeId: ObjectID;

  @Column({ enum: WorkspaceRouteResponseType })
  responseType: WorkspaceRouteResponseType;

  @Column({ nullable: true })
  schema: ContentType | null;
}
