import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import { PokemonServiceModule } from '../../../services/pokemon/pokemon.service.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, PokemonServiceModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Output() onSearch: EventEmitter<string>;
  form: FormGroup;

  constructor(private pokemonService: PokemonService) {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.minLength(3)]),
    });
    this.onSearch = new EventEmitter();
  }

  ngOnInit(): void {
    this.onChangeMonit();
  }

  onChangeMonit() {
    this.form
      .get('query')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query: string) => this.emitSearch(query));
  }

  emitSearch(query: string) {
    if (this.form.get('query')?.valid) {
      const queryCleaned = query.trim().toLocaleLowerCase();
      this.pokemonService.emitSearch(queryCleaned);
    }
  }
}
