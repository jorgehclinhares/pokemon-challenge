import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from '../../components/header/header/header.component';
import { PaginationComponent } from '../../components/pagination/pagination/pagination.component';
import { PokemonServiceModule } from '../../services/pokemon/pokemon.service.module';
import { CommentComponent } from '../../components/comment/comment.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { AppState } from '../../state/app/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { pokemonDetailMock } from '../../mocks/pokemon-detail.mock';
import { pokemonDetailResponseMock } from '../../mocks/pokemon-detail-response.mock';
import { Subject, of } from 'rxjs';
import { pokemonListResponseMock } from '../../mocks/pokemon-list-response.mock';
import { PokemonDetail } from '../../services/pokemon/pokemon';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let pokemon: PokemonDetail;

  const pokemonServiceMock = {
    detail: jest.fn(),
    list: jest.fn(),
    query: Subject<string>,
    emitSearch: jest.fn(),
  } as unknown as jest.Mocked<PokemonService>;

  const initialState: AppState = {
    pokemon: {
      favorities: [],
      comments: [],
      actualPageList: 1,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HeaderComponent,
        PaginationComponent,
        CommentComponent,
        PokemonCardComponent,
        PokemonServiceModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: PokemonService,
          useValue: pokemonServiceMock,
        },
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    const newState: AppState = {
      pokemon: {
        favorities: [{ order: 1, page: 1, index: 0 }],
        comments: [
          { order: 1, page: 1, index: 0, name: 'teste', message: 'teste' },
        ],
        actualPageList: 2,
      },
    };
    store.setState(newState);

    pokemon = pokemonDetailMock[0];
    pokemonServiceMock.detail.mockReturnValue(of(pokemonDetailResponseMock));
    pokemonServiceMock.list.mockReturnValue(of(pokemonListResponseMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close comment modal', () => {
    component.closeCommentModal();
    expect(component.showCommentModal).toBeFalsy();
  });

  it('should open comment modal', () => {
    component.openModalComment(pokemon);
    expect(component.commentModalPokemon).toEqual(pokemon);
    expect(component.showCommentModal).toBeTruthy();
  });

  it('should redirect page for detail', () => {
    // para remover warn de redirect fora da zona do angular
    // @ts-ignore
    fixture.ngZone.run(() => {
      const spyRouter = jest.spyOn(component['router'], 'navigateByUrl');
      component.openPageDetail(pokemon);
      expect(spyRouter).toHaveBeenCalledWith(`pokedex/${pokemon.name}`);
    });
  });
});
