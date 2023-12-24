import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.less',
})
export class HistoryPageComponent { }
