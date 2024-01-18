import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { pokemonDetailMock } from '../../mocks/pokemon-detail.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent, ReactiveFormsModule],
      providers: [BsModalService],
    }).compileComponents();

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

  it('should exist a modal reference', () => {
    fixture.detectChanges();
    expect(component.modal).not.toBeUndefined();
  });

  it('should dispatch on delete comment', () => {
    const spyOnDeleteEmit = jest.spyOn(component.onDeleteComment, 'emit');
    fixture.detectChanges();
    component.deleteComment();
    expect(spyOnDeleteEmit).toHaveBeenCalledWith(pokemonDetailMock[0]);
  });

  it('should block dispatch on add comment', () => {
    const spyOnAddEmit = jest.spyOn(component.onAddComment, 'emit');
    component.form.get('name')?.setValue('');
    component.form.get('message')?.setValue('');
    fixture.detectChanges();
    component.addComment();
    expect(spyOnAddEmit).not.toHaveBeenCalledWith(pokemonDetailMock[0]);
  });

  it('should dispatch on add comment', () => {
    const spyOnAddEmit = jest.spyOn(component.onAddComment, 'emit');
    component.form.get('name')?.setValue('Jorge');
    component.form.get('message')?.setValue('Este é um comentário válido');
    fixture.detectChanges();
    component.addComment();
    expect(spyOnAddEmit).toHaveBeenCalledWith(pokemonDetailMock[0]);
  });
});
