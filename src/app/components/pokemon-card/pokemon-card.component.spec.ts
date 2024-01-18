import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { LikeComponent } from '../like/like.component';
import { CommonModule } from '@angular/common';
import { pokemonDetailMock } from '../../../mocks/pokemon-detail.mock';
import { By } from '@angular/platform-browser';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonCardComponent,
        NumberPokedexPipe,
        PokemonTypeClassDirective,
        LikeComponent,
        CommonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonDetailMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon info elements', () => {
    const pokemonName = fixture.debugElement.query(
      By.css('.info h4'),
    )?.nativeElement;
    const pokemonComment = fixture.debugElement.query(
      By.css('.comments .message'),
    )?.nativeElement;
    const pokemonLike = fixture.debugElement.query(
      By.css('.like'),
    )?.nativeElement;
    const pokemonSprite = fixture.debugElement.query(
      By.css('.box img'),
    )?.nativeElement;

    expect(pokemonName.innerHTML).toEqual(pokemonDetailMock[0].name);
    expect(pokemonComment.innerHTML).toMatch('Nenhum comentário adicionado');
    expect(pokemonLike).toBeTruthy();
    expect(pokemonSprite.src).toEqual(
      pokemonDetailMock[0].sprites?.front_default,
    );
  });

  it('should emit on open comment with actual pokemon', () => {
    const spyOnOpenComment = jest.spyOn(component.onOpenComment, 'emit');
    const pokemonComment = fixture.debugElement.query(
      By.css('.comments'),
    ).nativeElement;
    pokemonComment.click();
    expect(spyOnOpenComment).toHaveBeenCalledWith(component.pokemon);
  });

  it('should emit on like with actual pokemon', () => {
    const spyOnLike = jest.spyOn(component.onLike, 'emit');
    component.emitLike();
    expect(spyOnLike).toHaveBeenCalledWith(component.pokemon);
  });

  it('should emit on open detail with actual pokemon', () => {
    const spyOnDetail = jest.spyOn(component.onOpenDetail, 'emit');
    const pokemonImage = fixture.debugElement.query(
      By.css('.box'),
    ).nativeElement;
    pokemonImage.click();
    expect(spyOnDetail).toHaveBeenCalledWith(component.pokemon);
  });
});
