import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { PokemonServiceModule } from '../../../services/pokemon/pokemon.service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, ReactiveFormsModule, PokemonServiceModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search', () => {
    const spyEmitSearch = jest.spyOn(component['pokemonService'], 'emitSearch');
    component.emitSearch('pikachu');
    expect(spyEmitSearch).toHaveBeenCalledWith('pikachu');
  });

  it('should emit search after change input value', () => {
    const spyEmitSearch = jest.spyOn(component['pokemonService'], 'emitSearch');

    const searchInput = fixture.debugElement.query(
      By.css('#searchInput'),
    ).nativeElement;

    searchInput.value = 'snorlax';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spyEmitSearch).toHaveBeenCalledWith('snorlax');
    });
  });

  it('should dispatch destroy for subscribes on destroy component', () => {
    const spySearchMonitDestroyNext = jest.spyOn(
      component['searchMonitDestroy'],
      'next',
    );
    const spySearchMonitDestroyComplete = jest.spyOn(
      component['searchMonitDestroy'],
      'complete',
    );
    component.ngOnDestroy();
    expect(spySearchMonitDestroyNext).toHaveBeenCalled();
    expect(spySearchMonitDestroyComplete).toHaveBeenCalled();
  });
});
