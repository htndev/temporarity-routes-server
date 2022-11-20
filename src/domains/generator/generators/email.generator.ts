import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class EmailGenerator implements BaseGenerator {
  execute() {
    return generator.email();
  }
}
