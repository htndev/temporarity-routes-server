import {
  BaseEntity as BaseTypeormEntity,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseTypeormEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
