import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import {
  PokemonDetail,
  PokemonDetailResponse,
  PokemonListResult,
} from '../../services/pokemon/pokemon';
import { Subject, take, takeUntil } from 'rxjs';
import { HeaderComponent } from '../../components/header/header/header.component';
import { PaginationComponent } from '../../components/pagination/pagination/pagination.component';
import { environment } from '../../../environments/environment.development';
import { PaginationConfiguration } from '../../components/pagination/pagination/pagination';
import { PokemonServiceModule } from '../../services/pokemon/pokemon.service.module';
import { Router, RouterModule } from '@angular/router';
import { CommentComponent } from '../../components/comment/comment.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { Store } from '@ngrx/store';
import { pokemonActions } from '../../state/pokemon/pokemon.actions';
import { pokemonActualPageSelector } from '../../state/pokemon/pokemon.selectors';
import {
  PokemonComment,
  PokemonFavorite,
} from '../../state/pokemon/pokemon.reducers';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    PaginationComponent,
    PokemonServiceModule,
    RouterModule,
    CommentComponent,
    PokemonCardComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly limitPerPage: number = environment.paginationLimitPerPage;
  private searchDestroy: Subject<void>;
  private actualPageDestroy: Subject<void>;

  pokemons: PokemonDetail[];
  paginationConfiguration: PaginationConfiguration;
  emptySearch: boolean;
  searchMode: boolean;
  showCommentModal: boolean;
  commentModalPokemon: PokemonDetail | undefined;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private store: Store,
  ) {
    this.pokemons = [];
    this.emptySearch = false;
    this.searchMode = false;
    this.showCommentModal = false;
    this.paginationConfiguration = {
      totalItems: 0,
      actualPage: 1,
      limitPagesVisible: 5,
    };
    this.searchDestroy = new Subject<void>();
    this.actualPageDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.searchOnChange();
    this.selectors();
  }

  loadState(): void {
    this.store.pipe(take(1)).subscribe((state: any) => {
      this.updateFavoriteInList(
        state.pokemon.actualPageList,
        state.pokemon.favorities,
      );
      this.updateCommentInList(
        state.pokemon.actualPageList,
        state.pokemon.comments,
      );
    });
  }

  selectors(): void {
    this.store
      .select(pokemonActualPageSelector)
      .pipe(takeUntil(this.actualPageDestroy))
      .subscribe((page: number) => {
        this.paginationConfiguration.actualPage = page;
        if (this.pokemons.length === 0 && !this.searchMode) {
          this.loadPokemon(page);
        }
      });
  }

  updateFavoriteInList(page: number, favorities: PokemonFavorite[]): void {
    favorities.forEach((favorite) => {
      if (favorite.page === page) {
        this.pokemons[favorite.index].favorited =
          !this.pokemons[favorite.index].favorited;
      }
    });
  }

  updateCommentInList(page: number, comments: PokemonComment[]): void {
    comments.forEach((comment) => {
      if (comment.page === page) {
        this.pokemons[comment.index].comment = {
          name: comment.name,
          message: comment.message,
        };
      }
    });
  }

  async loadPokemon(page: number) {
    const offset = (page - 1) * this.limitPerPage;
    const limit = this.limitPerPage;

    this.pokemonService
      .list(offset, limit)
      .pipe(take(1))
      .subscribe((response) => {
        this.paginationConfiguration.totalItems = response.count;
        this.loadPokemonsDetails(response.results);
      });
  }

  loadPokemonsDetails(pokemonList: PokemonListResult[]) {
    const requests: any[] = [];

    pokemonList.forEach((pokemon) =>
      requests.push(this.loadPokemonDetail(pokemon.name)),
    );

    Promise.all(requests).then((responses) => {
      this.pokemons = responses.map((pokemon) => {
        return {
          name: pokemon.name,
          order: pokemon.id,
          weight: pokemon.weight,
          height: pokemon.height,
          abilities: pokemon.abilities,
          types: pokemon.types,
          sprites: pokemon.sprites,
          favorited: false,
          comment: {
            name: '',
            message: '',
          },
        };
      });

      this.loadState();
    });
  }

  async loadPokemonDetail(name: string): Promise<PokemonDetailResponse> {
    return new Promise((resolve, reject) => {
      this.pokemonService
        .detail(name)
        .pipe(take(1))
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  onPageChange(page: number): void {
    this.store.dispatch(pokemonActions.changeActualPageList({ page }));
    this.loadPokemon(page);
  }

  onLike(pokemon: PokemonDetail): void {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].favorited = pokemon.favorited;
    const order = pokemon.order;
    const index = pokemonIndex;
    const page = this.paginationConfiguration.actualPage;

    this.store.dispatch(pokemonActions.favoriteToggle({ order, page, index }));
  }

  searchOnChange() {
    this.pokemonService.query.pipe(takeUntil(this.searchDestroy)).subscribe({
      next: async (query: string) => {
        this.searchMode = true;

        if (query === '') {
          this.searchMode = false;
          return this.loadPokemon(this.paginationConfiguration.actualPage);
        }

        try {
          const pokemon = await this.loadPokemonDetail(query);
          this.emptySearch = false;

          this.pokemons = [
            {
              name: pokemon.name,
              order: pokemon.id,
              weight: pokemon.weight,
              height: pokemon.height,
              abilities: pokemon.abilities,
              types: pokemon.types,
              sprites: pokemon.sprites,
              favorited: false,
              comment: {
                name: '',
                message: '',
              },
            },
          ];
        } catch (err) {
          this.pokemons = [];
          this.emptySearch = true;
        }
      },
    });
  }

  openPageDetail(pokemon: PokemonDetail): void {
    this.router.navigateByUrl(`pokedex/${pokemon.name}`);
  }

  openModalComment(pokemon: PokemonDetail) {
    this.commentModalPokemon = pokemon;
    this.showCommentModal = true;
  }

  addComent(pokemon: PokemonDetail) {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].comment = pokemon.comment;
    const order = pokemon.order;
    const index = pokemonIndex;
    const page = this.paginationConfiguration.actualPage;
    const name = pokemon.comment.name;
    const message = pokemon.comment.message;
    this.store.dispatch(
      pokemonActions.addComment({ order, page, index, name, message }),
    );
  }

  deleteComment(pokemon: PokemonDetail) {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].comment.name = '';
    this.pokemons[pokemonIndex].comment.message = '';
    const order = pokemon.order;
    const index = pokemonIndex;
    const page = this.paginationConfiguration.actualPage;
    const name = '';
    const message = '';
    this.store.dispatch(
      pokemonActions.deleteComment({ order, page, index, name, message }),
    );
  }

  private getPokemonByOrder(order: number) {
    return this.pokemons.findIndex((item) => order === item.order);
  }

  closeCommentModal() {
    this.showCommentModal = false;
  }

  ngOnDestroy(): void {
    this.searchDestroy.next();
    this.searchDestroy.complete();

    this.actualPageDestroy.next();
    this.actualPageDestroy.complete();
  }
}
