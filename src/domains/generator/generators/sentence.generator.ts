import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class SentenceGenerator implements BaseGenerator {
  constructor(private readonly count: number) {}

  execute(): string {
    return generator.sentence({ words: this.count });
  }
}
