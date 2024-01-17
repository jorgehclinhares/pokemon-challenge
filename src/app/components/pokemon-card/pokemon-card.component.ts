import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NumberPokedexPipe } from '../../pipes/number-pokedex/number-pokedex.pipe';
import { PokemonTypeClassDirective } from '../../directives/pokemon-type-class/pokemon-type-class.directive';
import { LikeComponent } from '../like/like/like.component';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '../../services/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    NumberPokedexPipe,
    PokemonTypeClassDirective,
    LikeComponent,
    CommonModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: PokemonDetail;
  @Output() onOpenComment: EventEmitter<PokemonDetail>;
  @Output() onLike: EventEmitter<PokemonDetail>;
  @Output() onOpenDetail: EventEmitter<PokemonDetail>;

  constructor() {
    this.onOpenComment = new EventEmitter();
    this.onLike = new EventEmitter();
    this.onOpenDetail = new EventEmitter();
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

  emitOpenComment(): void {
    this.onOpenComment.emit(this.pokemon);
  }

  emitLike(): void {
    this.pokemon.liked = !this.pokemon.liked;
    this.onLike.emit(this.pokemon);
  }

  emitOpenDetail(): void {
    this.onOpenDetail.emit(this.pokemon);
  }
}
