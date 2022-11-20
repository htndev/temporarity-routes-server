import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class IntegerGenerator implements BaseGenerator {
  private min = 0;
  private max = 100;

  constructor(maxOrMin?: number, max?: number) {
    if (typeof maxOrMin === 'undefined') {
      return;
    }

    if (maxOrMin && typeof maxOrMin === 'undefined') {
      this.max = maxOrMin;
    } else if (maxOrMin && max) {
      this.min = maxOrMin;
      this.max = max;
    }
  }

  execute(): number {
    return generator.integer({ min: Number(this.min), max: Number(this.max) });
  }
}
