import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { pokemonsReducer } from '../pokemon/pokemon.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  pokemon: pokemonsReducer,
};
