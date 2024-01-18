import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app/app.state';

export const pokemonsState = createFeatureSelector<AppState>('pokemon');

export const pokemonActualPageSelector = createSelector(
  pokemonsState,
  (state: any) => state.actualPageList,
);
