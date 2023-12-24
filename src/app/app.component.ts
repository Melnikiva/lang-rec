import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UploadAreaComponent } from './upload-area/upload-area.component';
import { RecordAreaComponent } from './record-area/record-area.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadService } from './upload-service/upload.service';
import { ManualUploadComponent } from './manual-upload/manual-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UploadAreaComponent, 
            RecordAreaComponent, NzLayoutModule, NzMenuModule, NzIconModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [UploadService]
})
export class AppComponent {
  title = 'lang-rec';
}
