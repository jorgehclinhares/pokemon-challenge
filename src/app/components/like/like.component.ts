import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
})
export class LikeComponent {
  @Input() favorited: boolean;
  @Output() onLike: EventEmitter<boolean>;

  constructor() {
    this.favorited = false;
    this.onLike = new EventEmitter();
  }

  likeOrUnlike(): void {
    this.favorited = !this.favorited;
    this.onLike.emit(this.favorited);
  }
}
