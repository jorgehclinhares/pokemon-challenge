import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonTypeClassDirective } from './pokemon-type-class.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Componente de teste
@Component({
  template: `<div [appPokemonTypeClass]="'fire'"></div>`,
  standalone: true,
  imports: [PokemonTypeClassDirective],
})
class TestComponent {}

describe('PokemonTypeClassDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // Atualiza a visualização para aplicar a diretiva
  });

  it('should create an instance', () => {
    const elementWithDirective = fixture.debugElement.query(
      By.directive(PokemonTypeClassDirective),
    ).nativeElement;
    const directive = new PokemonTypeClassDirective(elementWithDirective);
    expect(directive).toBeTruthy();
  });

  it('should render class inputed', () => {
    const elementWithDirective = fixture.debugElement.query(
      By.directive(PokemonTypeClassDirective),
    ).nativeElement;
    expect(elementWithDirective.classList.contains('fire')).toBeTruthy();
  });
});
