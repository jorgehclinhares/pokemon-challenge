import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PokemonDetail } from '../../services/pokemon/pokemon';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [BsModalService],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit, AfterViewInit {
  @Input() pokemon: PokemonDetail;
  @Output() onAddComment: EventEmitter<PokemonDetail>;
  @Output() onDeleteComment: EventEmitter<PokemonDetail>;
  @Output() onModalClose: EventEmitter<any>;
  @ViewChild('modal') modal!: TemplateRef<any>;
  form: FormGroup;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.onAddComment = new EventEmitter();
    this.onModalClose = new EventEmitter();
    this.onDeleteComment = new EventEmitter();
    this.pokemon = {
      name: '',
      order: 0,
      weight: 0,
      height: 0,
      abilities: [],
      types: [],
      sprites: undefined,
      favorited: false,
      comment: {
        name: '',
        message: '',
      },
    };
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modal);
  }

  ngOnInit(): void {
    this.inserValuesInputed();
  }

  ngAfterViewInit(): void {
    this.openModal();
    this.monitCloseModal();
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  monitCloseModal(): void {
    this.modalRef?.onHide?.subscribe(() => {
      this.onModalClose.emit();
    });
  }

  inserValuesInputed(): void {
    this.form.get('name')?.setValue(this.pokemon.comment.name);
    this.form.get('message')?.setValue(this.pokemon.comment.message);
  }

  addComment(): void {
    if (this.form.valid) {
      this.pokemon.comment.name = this.form.get('name')?.value;
      this.pokemon.comment.message = this.form.get('message')?.value;
      this.onAddComment.emit(this.pokemon);
      this.closeModal();
    }
  }

  deleteComment() {
    this.onDeleteComment.emit(this.pokemon);
    this.closeModal();
  }

  get validInputName(): boolean {
    return this.form.get('name')?.errors && this.form.get('name')?.touched
      ? true
      : false;
  }

  get validInputMessage(): boolean {
    return this.form.get('message')?.errors && this.form.get('message')?.touched
      ? true
      : false;
  }
}
