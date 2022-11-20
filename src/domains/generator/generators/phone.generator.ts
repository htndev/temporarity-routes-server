import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class PhoneGenerator implements BaseGenerator {
  execute() {
    return generator.phone();
  }
}
