import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class GenderGenerator implements BaseGenerator {
  execute() {
    return generator.gender();
  }
}
