import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UploadAreaComponent } from './upload-area/upload-area.component';
import { RecordAreaComponent } from './record-area/record-area.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadService } from './upload-service/upload.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Select, Store } from '@ngxs/store';
import { LoadHistory, LogOut, UserState, UserStateModel } from './state/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UploadAreaComponent, 
            RecordAreaComponent, NzLayoutModule, NzMenuModule, NzIconModule, RouterLink, NzGridModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'lang-rec';

  @Select(UserState) user$!: Observable<UserStateModel>;

  constructor(private store: Store) {}

  logOut() {
    this.store.dispatch(new LogOut());
  }

  loadHistory() {
    this.store.dispatch(new LoadHistory());
  }
}
