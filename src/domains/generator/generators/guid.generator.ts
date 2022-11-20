import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class GuidGenerator implements BaseGenerator {
  execute(): string {
    return generator.guid();
  }
}
