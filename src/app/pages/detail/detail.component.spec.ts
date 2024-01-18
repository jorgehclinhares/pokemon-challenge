import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { PokemonServiceModule } from '../../services/pokemon/pokemon.service.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { pokemonDetailResponseMock } from '../../mocks/pokemon-detail-response.mock';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonDetail } from '../../services/pokemon/pokemon';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let pokemonServiceMock = {
    detail: jest.fn(),
  } as unknown as jest.Mocked<PokemonService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailComponent,
        PokemonServiceModule,
        RouterModule,
        NumberPokedexPipe,
        PokemonTypeClassDirective,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                pokemonName: 'charmander',
              },
            },
          },
        },
        {
          provide: PokemonService,
          useValue: pokemonServiceMock,
        },
      ],
    }).compileComponents();
    pokemonServiceMock.detail.mockImplementation(() =>
      of(pokemonDetailResponseMock),
    );
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pokemon object', () => {
    const pokemon: PokemonDetail = {
      name: pokemonDetailResponseMock.name,
      order: pokemonDetailResponseMock.id,
      weight: pokemonDetailResponseMock.weight,
      height: pokemonDetailResponseMock.height,
      abilities: pokemonDetailResponseMock.abilities,
      types: pokemonDetailResponseMock.types,
      sprites: pokemonDetailResponseMock.sprites,
      favorited: false,
      comment: {
        name: '',
        message: '',
      },
    };

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.pokemonAbilitiesText).toEqual('blaze | solar-power');
      expect(component.pokemon).toEqual(pokemon);
    });
  });
});
