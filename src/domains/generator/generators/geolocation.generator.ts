import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class GeolocationGenerator implements BaseGenerator {
  execute() {
    return generator.coordinates();
  }
}
