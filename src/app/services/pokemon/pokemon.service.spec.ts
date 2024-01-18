import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { PokemonServiceModule } from './pokemon.service.module';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { pokemonListResponseMock } from '../../mocks/pokemon-list-response.mock';
import { pokemonDetailResponseMock } from '../../mocks/pokemon-detail-response.mock';

describe('ApiService', () => {
  let service: PokemonService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PokemonServiceModule],
    });
    service = TestBed.inject(PokemonService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call list of pokemons with parameters', () => {
    expect(service).toBeTruthy();
    service.list(1, 10).subscribe((res) => {
      expect(res).toEqual(pokemonListResponseMock);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiURL}/pokemon`,
    });

    req.flush(pokemonListResponseMock);
  });

  it('should be call detail of pokemons with parameters', () => {
    expect(service).toBeTruthy();
    service.detail('charmander').subscribe((res) => {
      expect(res).toEqual(pokemonDetailResponseMock);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiURL}/pokemon/charmander`,
    });

    req.flush(pokemonDetailResponseMock);
  });

  it('should emit query change value', () => {
    const spySearch = jest.spyOn(service.query, 'next');
    service.emitSearch('charizard');
    expect(spySearch).toHaveBeenCalledWith('charizard');
  });
});
