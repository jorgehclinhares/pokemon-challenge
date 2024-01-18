import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'pokedex', component: HomeComponent },
  {
    path: 'pokedex/:pokemonName',
    loadComponent: () =>
      import('./pages/detail/detail.component').then(
        (mod) => mod.DetailComponent,
      ),
  },
  { path: '**', redirectTo: 'pokedex' },
];
