import { createAction, props } from '@ngrx/store';
import { PokemonComment, PokemonFavorite } from './pokemon.reducers';

const favoriteToggle = createAction(
  '[Pokemon] like pokemon',
  props<PokemonFavorite>(),
);

const addComment = createAction(
  '[Pokemon] add new comment for specific pokemon',
  props<PokemonComment>(),
);

const deleteComment = createAction(
  '[Pokemon] delete a existed comment for specific pokemon',
  props<PokemonComment>(),
);

const changeActualPageList = createAction(
  '[Pokemon] delete a existed comment for specific pokemon',
  props<{ page: number }>(),
);

export const pokemonActions = {
  favoriteToggle,
  addComment,
  deleteComment,
  changeActualPageList,
};
