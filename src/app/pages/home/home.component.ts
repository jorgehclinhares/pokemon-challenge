import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import {
  PokemonDetail,
  PokemonDetailResponse,
  PokemonListResult,
} from '../../services/pokemon/pokemon';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { Subject, take, takeUntil } from 'rxjs';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { HeaderComponent } from '../../components/header/header/header.component';
import { PaginationComponent } from '../../components/pagination/pagination/pagination.component';
import { environment } from '../../../environments/environment.development';
import { PaginationConfiguration } from '../../components/pagination/pagination/pagination';
import { LikeComponent } from '../../components/like/like/like.component';
import { PokemonServiceModule } from '../../services/pokemon/pokemon.service.module';
import { Router, RouterModule } from '@angular/router';
import { CommentComponent } from '../../components/comment/comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    NumberPokedexPipe,
    PokemonTypeClassDirective,
    HeaderComponent,
    PaginationComponent,
    LikeComponent,
    PokemonServiceModule,
    RouterModule,
    CommentComponent,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly limitPerPage: number = environment.paginationLimitPerPage;
  private searchUnsubscribe = new Subject<void>();
  pokemons: PokemonDetail[];
  paginationConfiguration: PaginationConfiguration;
  emptySearch: boolean;
  searchMode: boolean;
  showCommentModal: boolean;
  commentModalPokemon: PokemonDetail | undefined;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
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
  }

  ngOnInit(): void {
    this.loadPokemon(1);
    this.searchOnChange();
  }

  async loadPokemon(page: number) {
    const offset = (page - 1) * this.limitPerPage;
    const params = { offset, limit: this.limitPerPage };

    this.pokemonService
      .list(params)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.paginationConfiguration.totalItems = response.count;
          this.loadPokemonsDetails(response.results);
        },
        error: (error) => console.log(error),
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
          liked: false,
          comment: {
            name: '',
            message: '',
          },
        };
      });
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
    this.paginationConfiguration.actualPage = page;
    this.loadPokemon(page);
  }

  onLike(liked: boolean, pokemon: PokemonDetail): void {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].liked = liked;
  }

  searchOnChange() {
    this.pokemonService.query
      .pipe(takeUntil(this.searchUnsubscribe))
      .subscribe({
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
                liked: false,
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

  openPageDetail(name: string): void {
    this.router.navigateByUrl(`pokedex/${name}`);
  }

  openModalComment(pokemon: PokemonDetail) {
    this.commentModalPokemon = pokemon;
    this.showCommentModal = true;
  }

  addComent(pokemon: PokemonDetail) {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].comment = pokemon.comment;
  }

  deleteComment(pokemon: PokemonDetail) {
    const pokemonIndex = this.getPokemonByOrder(pokemon.order);
    this.pokemons[pokemonIndex].comment.name = '';
    this.pokemons[pokemonIndex].comment.message = '';
  }

  getPokemonByOrder(order: number) {
    return this.pokemons.findIndex((item) => order === item.order);
  }

  closeCommentModal() {
    this.showCommentModal = false;
  }

  ngOnDestroy(): void {
    this.searchUnsubscribe.next();
    this.searchUnsubscribe.complete();
  }
}
