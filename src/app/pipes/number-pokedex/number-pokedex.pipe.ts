import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Pipe({
  name: 'numberPokedex',
  standalone: true,
})
export class NumberPokedexPipe implements PipeTransform {
  transform(value: number, length: number, padChar: string = '0'): string {
    return value && value < environment.maximumNumberForPipePokedex
      ? String(value).padStart(length, padChar)
      : String(value);
  }
}
