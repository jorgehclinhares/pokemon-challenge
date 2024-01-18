import { createReducer, on } from '@ngrx/store';
import { pokemonActions } from './pokemon.actions';

export interface PokemonFavorite {
  order: number;
  page: number;
  index: number;
}

export interface PokemonComment {
  order: number;
  page: number;
  index: number;
  name: string;
  message: string;
}

export interface PokemonState {
  favorities: PokemonFavorite[];
  comments: PokemonComment[];
  actualPageList: number;
}

const initialState: PokemonState = {
  favorities: [],
  comments: [],
  actualPageList: 1,
};

export const pokemonsReducer = createReducer(
  initialState,
  on(pokemonActions.favoriteToggle, (actualState, { order, page, index }) => {
    const favoriteExists = actualState.favorities.find(
      (like) => like.order === order,
    );

    let favorities = actualState.favorities;

    if (favoriteExists) {
      favorities = favorities.filter((favorite) => favorite.order !== order);
    } else {
      favorities = [...favorities, { order, page, index }];
    }

    return {
      ...actualState,
      favorities,
    };
  }),
  on(
    pokemonActions.addComment,
    (actualState, { order, page, index, name, message }) => {
      let comments = actualState.comments;
      const commentIndex = comments.findIndex(
        (comment) => comment.order === order,
      );

      if (commentIndex > -1) {
        comments = {
          ...comments,
          [commentIndex]: { order, page, index, name, message },
        };
      } else {
        comments = [...comments, { order, page, index, name, message }];
      }

      return {
        ...actualState,
        comments,
      };
    },
  ),
  on(pokemonActions.deleteComment, (actualState, { order }) => {
    const comments = actualState.comments.filter(
      (comment) => comment.order !== order,
    );

    return {
      ...actualState,
      comments,
    };
  }),
  on(pokemonActions.changeActualPageList, (actualState, { page }) => {
    return {
      ...actualState,
      actualPageList: page,
    };
  }),
);
