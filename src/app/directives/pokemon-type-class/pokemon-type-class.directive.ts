import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPokemonTypeClass]',
  standalone: true,
})
export class PokemonTypeClassDirective {
  @Input() set appPokemonTypeClass(type: string) {
    if (type) {
      this.addClassname(type);
    }
  }

  constructor(private elemento: ElementRef) {}

  addClassname(name: string) {
    this.elemento.nativeElement.classList.add(name);
  }
}
