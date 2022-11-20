import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class AddressGenerator implements BaseGenerator {
  execute() {
    return generator.address();
  }
}
