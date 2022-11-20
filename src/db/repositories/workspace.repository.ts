import { Injectable } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { Workspace } from '../entities/workspace.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class WorkspaceRepository extends BaseRepository<Workspace> {
  async getShortInformation(
    id: ObjectID,
  ): Promise<
    Pick<Workspace, 'name' | 'slug' | 'description'> & { id: ObjectID }
  > {
    const workspace = await this.findOneById(id);

    return {
      id: workspace._id,
      slug: workspace.slug,
      name: workspace.name,
      description: workspace.description,
    };
  }

  async getWorkspaceBySlug(slug: string): Promise<Workspace> {
    return this.findOne({ where: { slug } });
  }
}
