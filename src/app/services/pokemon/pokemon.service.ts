import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PokemonDetailResponse, PokemonListResponse } from './pokemon';

@Injectable()
export class PokemonService {
  private apiUrl: string;
  query: Subject<string>;

  constructor(private api: HttpClient) {
    this.apiUrl = environment.apiURL;
    this.query = new Subject();
  }

  list(offset: number, limit: number): Observable<PokemonListResponse> {
    const params = { offset, limit };
    return this.api.get<PokemonListResponse>(`${this.apiUrl}/pokemon`, {
      params,
    });
  }

  detail(name: string): Observable<PokemonDetailResponse> {
    return this.api.get<PokemonDetailResponse>(
      `${this.apiUrl}/pokemon/${name}`,
    );
  }

  emitSearch(query: string) {
    this.query.next(query);
  }
}
