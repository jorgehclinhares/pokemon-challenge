import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PokemonDetailResponse, PokemonListResponse } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl: string;

  constructor(private api: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  list(params: any): Observable<PokemonListResponse> {
    return this.api.get<PokemonListResponse>(`${this.apiUrl}/pokemon`, {
      params,
    });
  }

  detail(name: string): Observable<PokemonDetailResponse> {
    return this.api.get<PokemonDetailResponse>(
      `${this.apiUrl}/pokemon/${name}`,
    );
  }
}
