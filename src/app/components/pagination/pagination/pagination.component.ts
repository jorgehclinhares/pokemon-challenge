import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() configuration: any;
  @Output() onPageChange: EventEmitter<number>;

  totalPagesCount: number;
  pagesVisible: number[];

  constructor() {
    this.configuration = {
      total: 100,
      actualPage: 1,
      limitPageShow: 5,
    };
    this.totalPagesCount = Math.ceil(this.configuration.total / 10);
    this.pagesVisible = this.visiblePages();
    this.onPageChange = new EventEmitter();
  }

  visiblePages(): number[] {
    let startPage = Math.max(
      1,
      this.configuration.actualPage - Math.floor(5 / 2),
    );

    let endPage = Math.min(this.configuration.total, startPage + 5 - 1);

    const differencePages =
      this.totalPagesCount - this.configuration.actualPage;

    if (differencePages < 2) {
      startPage = startPage - (differencePages === 0 ? 2 : 1);
      endPage = this.totalPagesCount;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage,
    );
  }

  next(): void {
    if (this.configuration.actualPage < this.totalPagesCount) {
      this.configuration.actualPage++;
      this.pagesVisible = this.visiblePages();
      this.onPageChange.emit(this.configuration.actualPage);
    }
  }

  previous() {
    if (this.configuration.actualPage > 1) {
      this.configuration.actualPage--;
      this.pagesVisible = this.visiblePages();
      this.onPageChange.emit(this.configuration.actualPage);
    }
  }

  goToPage(page: number) {
    this.configuration.actualPage = page;
    this.pagesVisible = this.visiblePages();
    this.onPageChange.emit(this.configuration.actualPage);
  }
}
