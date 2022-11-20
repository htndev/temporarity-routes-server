import { Instance } from '../utils/base.type';
import { AddressGenerator } from './address.generator';
import { BaseGenerator } from './base.generator';
import { BooleanGenerator } from './boolean.generator';
import { CityGenerator } from './city.generator';
import { CountryGenerator } from './country.generator';
import { DateGenerator } from './date.generator';
import { EmailGenerator } from './email.generator';
import { FirstNameGenerator } from './first-name.generator';
import { FloatGenerator } from './float.generator';
import { GenderGenerator } from './gender.generator';
import { GeolocationGenerator } from './geolocation.generator';
import { GuidGenerator } from './guid.generator';
import { IntegerGenerator } from './integer.generator';
import { IpGenerator } from './ip.generator';
import { LastNameGenerator } from './last-name.generator';
import { PhoneGenerator } from './phone.generator';
import { RandomItemGenerator } from './random-item.generator';
import { SentenceGenerator } from './sentence.generator';
import { UsernameGenerator } from './username.generator';

type CommandsMap = {
  [k: string]: Instance<BaseGenerator>;
};

export const COMMAND_MAP: CommandsMap = {
  address: AddressGenerator,
  bool: BooleanGenerator,
  boolean: BooleanGenerator,
  city: CityGenerator,
  country: CountryGenerator,
  date: DateGenerator,
  email: EmailGenerator,
  firstName: FirstNameGenerator,
  float: FloatGenerator,
  gender: GenderGenerator,
  geolocation: GeolocationGenerator,
  guid: GuidGenerator,
  int: IntegerGenerator,
  integer: IntegerGenerator,
  ip: IpGenerator,
  lastName: LastNameGenerator,
  phone: PhoneGenerator,
  randomItem: RandomItemGenerator,
  sentence: SentenceGenerator,
  username: UsernameGenerator
};
