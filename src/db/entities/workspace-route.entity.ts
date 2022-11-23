import { Column, Entity, Index, ObjectID } from 'typeorm';
import { HttpMethod } from '../../constants/common.constant';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspace_routes' })
export class WorkspaceRoute extends BaseEntity {
  @Column({ type: 'string' })
  workspaceId: ObjectID;

  @Column()
  @Index()
  path: string;

  @Column()
  @Index()
  pathPattern: RegExp;

  @Column({ type: 'array' })
  methods: HttpMethod[];

  @Column()
  status: number;
}
