import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspaces' })
export class Workspace extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  apiKey: string;
}
