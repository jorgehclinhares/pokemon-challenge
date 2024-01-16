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
  @Input() liked: boolean;
  @Output() onLike: EventEmitter<boolean>;

  constructor() {
    this.liked = false;
    this.onLike = new EventEmitter();
  }

  likeOrUnlike(): void {
    this.liked = !this.liked;
    this.onLike.emit(this.liked);
  }
}
