import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  { path: 'pokedex', component: HomeComponent },
  { path: 'pokedex/:pokemonName', component: DetailComponent },
  { path: '**', redirectTo: 'pokedex' },
];
