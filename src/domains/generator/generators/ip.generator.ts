import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class IpGenerator implements BaseGenerator {
  execute() {
    return generator.ip();
  }
}
