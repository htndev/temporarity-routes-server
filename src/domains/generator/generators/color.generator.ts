import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class ColorGenerator implements BaseGenerator {
  execute() {
    return generator.color();
  }
}
