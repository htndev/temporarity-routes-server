import { Provider, Type } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DataSource, DataSourceOptions, ObjectID } from 'typeorm';
import { BaseEntity } from '../db/entities/base.entity';
import { BaseRepository } from '../db/repositories/base.repository';

export function provideCustomRepository<
  Entity extends BaseEntity,
  Repo extends BaseRepository<Entity>,
>(
  entity: Type<Entity>,
  repository: Type<Repo>,
  dataSource?: DataSource | DataSourceOptions | string,
): Provider<Repo> {
  return {
    provide: repository,
    inject: [getDataSourceToken(dataSource)],
    useFactory(dataSource: DataSource) {
      const baseRepository = dataSource.getRepository(entity);

      return new repository(
        baseRepository.target,
        baseRepository.manager,
        baseRepository.queryRunner,
      );
    },
  };
}

export const transformObjectIdObject = (value: ObjectID): ObjectID =>
  new ObjectId(value.toHexString()) as any;

export const transformObjectIdString = (value: string): ObjectID =>
  new ObjectId(value) as any;

export const transformObjectId = (value: ObjectID | string): ObjectID =>
  typeof value === 'string'
    ? (new ObjectId(value) as any)
    : (new ObjectId(value.toHexString()) as any);
