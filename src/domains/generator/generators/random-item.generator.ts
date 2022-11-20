import { BaseGenerator } from './base.generator';

export class RandomItemGenerator implements BaseGenerator {
  private args: any[] = [];

  constructor(...args: any[]) {
    this.args = args;
  }

  execute() {
    return this.args[Math.floor(Math.random() * this.args.length)];
  }
}
