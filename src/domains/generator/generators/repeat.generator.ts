import { RootParser } from '../parsers/root.parser';
import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class RepeatGenerator implements BaseGenerator {
  private repeatTimesMin = 0;
  private repeatTimesMax = 0;
  private entity = {};

  constructor(repeatMin: number | undefined, repeatMax: number | undefined, entity: any) {
    this.entity = entity;

    if (typeof repeatMin === 'number' && !Number.isNaN(repeatMax)) {
      this.repeatTimesMin = repeatMin;
      this.repeatTimesMax = repeatMax as number;
    } else if (typeof repeatMin !== 'undefined' && Number.isNaN(repeatMax)) {
      this.repeatTimesMin = repeatMin;
      this.repeatTimesMax = repeatMin;
    } else {
      this.repeatTimesMin = 0;
      this.repeatTimesMax = 20;
    }
  }

  execute() {
    const repeatTimes = generator.integer({
      min: Number(this.repeatTimesMin),
      max: Number(this.repeatTimesMax)
    });

    if (!this.entity) {
      return [repeatTimes];
    }

    const result = Array.from({ length: repeatTimes }, () => {
      const parser = new RootParser(this.entity);

      return parser.parse();
    });

    return result;
  }
}
