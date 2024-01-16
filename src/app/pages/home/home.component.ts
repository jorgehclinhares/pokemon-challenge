import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetail, PokemonListResult } from '../../services/pokemon';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { take } from 'rxjs';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { HeaderComponent } from '../../components/header/header/header.component';

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
  ],
})
export class HomeComponent implements OnInit {
  private apiOffset: number;
  pokemons: PokemonDetail[];

  constructor(private pokemonApi: PokemonService) {
    this.pokemons = [];
    this.apiOffset = 0;
  }

  ngOnInit(): void {
    this.loadPokemon();
  }

  async loadPokemon() {
    const params = { offset: this.apiOffset, limit: 10 };
    this.pokemonApi
      .list(params)
      .pipe(take(1))
      .subscribe({
        next: (response) => this.loadPokemonsDetails(response.results),
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
          order: pokemon.order,
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
}
