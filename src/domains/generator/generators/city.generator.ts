import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class CityGenerator implements BaseGenerator {
  execute() {
    return generator.city();
  }
}
