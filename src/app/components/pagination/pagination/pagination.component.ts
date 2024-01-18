import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationConfiguration } from './pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() set configuration(configuration: PaginationConfiguration) {
    if (configuration) {
      this.pageConfiguration = configuration;
      this.totalPagesCount = Math.ceil(this.pageConfiguration.totalItems / 10);
      this.pagesVisible = this.visiblePages();
    }
  }
  @Output() onPageChange: EventEmitter<number>;

  totalPagesCount: number;
  pagesVisible: number[];
  pageConfiguration: PaginationConfiguration;

  constructor() {
    this.pageConfiguration = {
      totalItems: 10,
      actualPage: 1,
      limitPagesVisible: 5,
    };

    this.onPageChange = new EventEmitter();

    this.totalPagesCount = Math.ceil(this.pageConfiguration.totalItems / 10);
    this.pagesVisible = this.visiblePages();
  }

  visiblePages(): number[] {
    let startPage = Math.max(
      1,
      this.pageConfiguration.actualPage -
        Math.floor(this.pageConfiguration.limitPagesVisible / 2),
    );

    let endPage = Math.min(
      this.pageConfiguration.totalItems,
      startPage + this.pageConfiguration.limitPagesVisible - 1,
    );

    const differencePages =
      this.totalPagesCount - this.pageConfiguration.actualPage;

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
    if (this.pageConfiguration.actualPage < this.totalPagesCount) {
      this.pageConfiguration.actualPage++;
      this.pagesVisible = this.visiblePages();
      this.onPageChange.emit(this.pageConfiguration.actualPage);
    }
  }

  previous() {
    if (this.pageConfiguration.actualPage > 1) {
      this.pageConfiguration.actualPage--;
      this.pagesVisible = this.visiblePages();
      this.onPageChange.emit(this.pageConfiguration.actualPage);
    }
  }

  goToPage(page: number) {
    this.pageConfiguration.actualPage = page;
    this.pagesVisible = this.visiblePages();
    this.onPageChange.emit(this.pageConfiguration.actualPage);
  }
}
