import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class FloatGenerator implements BaseGenerator {
  constructor(private readonly min: number = 0, private readonly max: number = 100) {}

  execute(): number {
    return generator.floating({ min: this.min, max: this.max });
  }
}
