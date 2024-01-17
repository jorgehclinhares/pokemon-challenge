import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../../services/pokemon/pokemon';
import { PokemonServiceModule } from '../../services/pokemon/pokemon.service.module';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { take } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    PokemonServiceModule,
    RouterModule,
    NumberPokedexPipe,
    PokemonTypeClassDirective,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  pokemon: PokemonDetail;
  pokemonAbilitiesText: string;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.pokemonAbilitiesText = '';
    this.pokemon = {
      name: '',
      order: 0,
      weight: 0,
      height: 0,
      abilities: [],
      types: [],
      sprites: undefined,
      liked: false,
      comment: {
        name: '',
        message: '',
      },
    };
  }

  ngOnInit(): void {
    const pokemonName = this.activatedRoute.snapshot.params['pokemonName'];
    this.loadPokemonDetail(pokemonName);
  }

  loadPokemonDetail(name: string): void {
    this.pokemonService
      .detail(name)
      .pipe(take(1))
      .subscribe({
        next: (pokemon) => {
          const pokemonAbilitiesText = pokemon.abilities.map(
            (ability) => ability.ability.name,
          );
          this.pokemonAbilitiesText = pokemonAbilitiesText.join(' | ');
          this.pokemon = {
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
        },
      });
  }
}
