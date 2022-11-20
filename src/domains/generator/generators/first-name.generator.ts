import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class FirstNameGenerator implements BaseGenerator {
  execute(): string {
    return generator.first();
  }
}
