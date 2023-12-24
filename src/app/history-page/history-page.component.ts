import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { UploadService } from '../upload-service/upload.service';
import { Select, Store } from '@ngxs/store';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { UserState, UserStateModel } from '../state/user.state';
import { Observable } from 'rxjs';
import { HistoryData } from './history';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    CommonModule, NzListModule, NzGridModule, NzCardModule, NzEmptyModule
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.less',
})
export class HistoryPageComponent implements OnInit { 
  data: HistoryData[] = []; 
  constructor(private store: Store) {

  }
  ngOnInit(): void {
    this.store.selectOnce<UserStateModel>(UserState).subscribe((user) => {
      this.data = [...user.history];
      console.log(user)
    }) 
  }
}
