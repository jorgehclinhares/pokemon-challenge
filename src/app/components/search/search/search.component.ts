import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import { PokemonServiceModule } from '../../../services/pokemon/pokemon.service.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, PokemonServiceModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onSearch: EventEmitter<string>;
  private searchMonitDestroy: Subject<void>;
  form: FormGroup;

  constructor(private pokemonService: PokemonService) {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.minLength(3)]),
    });
    this.onSearch = new EventEmitter();
    this.searchMonitDestroy = new Subject();
  }

  ngOnInit(): void {
    this.onChangeMonit();
  }

  onChangeMonit() {
    this.form
      .get('query')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.searchMonitDestroy),
      )
      .subscribe((query: string) => this.emitSearch(query));
  }

  emitSearch(query: string) {
    if (this.form.get('query')?.valid) {
      const queryCleaned = query.trim().toLocaleLowerCase();
      this.pokemonService.emitSearch(queryCleaned);
    }
  }

  ngOnDestroy(): void {
    this.searchMonitDestroy.next();
    this.searchMonitDestroy.complete();
  }
}
