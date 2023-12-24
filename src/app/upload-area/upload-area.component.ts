import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UploadService } from '../upload-service/upload.service';

@Component({
  selector: 'app-upload-area',
  templateUrl: './upload-area.component.html',
  styleUrl: './upload-area.component.less',
  standalone: true,
  imports: [NzUploadModule, NzButtonModule],
})
export class UploadAreaComponent {
  constructor(private msg: NzMessageService) {}

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
