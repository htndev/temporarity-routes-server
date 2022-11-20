import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class LastNameGenerator implements BaseGenerator {
  execute(): string {
    return generator.last();
  }
}
