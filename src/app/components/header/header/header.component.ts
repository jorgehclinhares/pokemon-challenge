import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SearchComponent],
})
export class HeaderComponent {}
