import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { pokemonDetailMock } from '../../../mocks/pokemon-detail.mock';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
    }).compileComponents();

    jest.mock('$', () => {
      return jest.fn(() => ({
        on: jest.fn(),
        modal: jest.fn(),
      }));
    });

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonDetailMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert values on init', () => {
    component.inserValuesInputed();
    expect(component.form.get('name')?.value).toEqual(
      pokemonDetailMock[0].comment.name,
    );
    expect(component.form.get('message')?.value).toEqual(
      pokemonDetailMock[0].comment.message,
    );
  });

  //todo: voltar aqui
  it('should reject on add comment when form invalid', () => {
    component.form.get('name')?.setValue(null);
    component.form.get('message')?.setValue(null);
    const spyCloseModal = jest.spyOn(component, 'closeModal');
    component.addComment();
    expect(spyCloseModal).toHaveBeenCalled();
  });
});
