import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetail, PokemonListResult } from '../../services/pokemon';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { take } from 'rxjs';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { HeaderComponent } from '../../components/header/header/header.component';
import { PaginationComponent } from '../../components/pagination/pagination/pagination.component';
import { environment } from '../../../environments/environment.development';
import { PaginationConfiguration } from '../../components/pagination/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [PokemonService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HttpClientModule,
    NumberPokedexPipe,
    PokemonTypeClassDirective,
    HeaderComponent,
    PaginationComponent,
  ],
})
export class HomeComponent implements OnInit {
  private readonly limitPerPage: number = environment.paginationLimitPerPage;
  pokemons: PokemonDetail[];
  paginationConfiguration: PaginationConfiguration;

  constructor(private pokemonApi: PokemonService) {
    this.pokemons = [];
    this.paginationConfiguration = {
      totalItems: 0,
      actualPage: 100,
      limitPagesVisible: 5,
    };
  }

  ngOnInit(): void {
    this.loadPokemon(1);
  }

  async loadPokemon(page: number) {
    const offset = (page - 1) * this.limitPerPage;
    const params = { offset, limit: this.limitPerPage };

    this.pokemonApi
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
        };
      });
    });
  }

  async loadPokemonDetail(name: string) {
    return new Promise((resolve, reject) => {
      this.pokemonApi
        .detail(name)
        .pipe(take(1))
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  onPageChange(page: number) {
    this.loadPokemon(page);
  }
}
