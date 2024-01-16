import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPokedex',
  standalone: true,
})
export class NumberPokedexPipe implements PipeTransform {
  transform(value: number, length: number, padChar: string = '0'): string {
    return value && value < 1000
      ? String(value).padStart(length, padChar)
      : String(value);
  }
}
