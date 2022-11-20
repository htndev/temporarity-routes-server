import { Injectable } from '@nestjs/common';
import { generate } from '../domains/generator';

@Injectable()
export class GeneratorProvider {
  generate(schema: any) {
    return generate(schema);
  }
}
