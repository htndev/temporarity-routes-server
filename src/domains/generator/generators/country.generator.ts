import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class CountryGenerator implements BaseGenerator {
  execute() {
    return generator.country({ full: true });
  }
}
