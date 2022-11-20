import { BaseGenerator } from './base.generator';

export class BooleanGenerator implements BaseGenerator {
  execute() {
    return Math.random() >= 0.5;
  }
}
