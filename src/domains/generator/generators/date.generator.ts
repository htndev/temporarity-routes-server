import { BaseGenerator } from './base.generator';

type DateType = string | 'today' | undefined;

export class DateGenerator implements BaseGenerator {
  constructor(private readonly startDate: DateType, private readonly endDate: DateType) {}

  execute() {
    const [start, end] = [this.startDate, this.endDate].map(this.safeDate);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private safeDate(date: DateType) {
    return date ? (date.includes('today') ? new Date() : new Date(date)) : new Date();
  }
}
