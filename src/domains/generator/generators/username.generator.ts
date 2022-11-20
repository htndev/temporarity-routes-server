import { usernames } from '../data/usernames';
import { generator } from '../utils/data-generator';
import { BaseGenerator } from './base.generator';

export class UsernameGenerator implements BaseGenerator {
  execute(): string {
    return generator.pickone(usernames);
  }
}
