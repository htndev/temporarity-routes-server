import { FindOneOptions, ObjectID, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  async isExists(entity: Partial<T>) {
    try {
      await this.findOneOrFail(entity as FindOneOptions<T>);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getId(entity: Partial<T>): Promise<ObjectID> {
    const object = await this.findOne(entity as FindOneOptions<T>);

    return object._id;
  }

  async findOneById(id: ObjectID): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.findOne({ where: { _id: id } });
  }
}
