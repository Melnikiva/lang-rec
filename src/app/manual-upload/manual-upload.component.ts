import { Component, EventEmitter, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ResponseData, UploadService } from '../upload-service/upload.service';
import { Store } from '@ngxs/store';
import { UserState, UserStateModel } from '../state/user.state';

@Component({
  selector: 'app-manual-upload',
  templateUrl: './manual-upload.component.html',
  styleUrl: './manual-upload.component.less',
  standalone: true,
  imports: [NzUploadModule, NzButtonModule]
})
export class ManualUploadComponent {
  @Output() recordingCallback = new EventEmitter<void>();
  @Output() result = new EventEmitter<ResponseData>();
  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(
    private msg: NzMessageService,
    private uploadService: UploadService,
    private store: Store
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    this.recordingCallback.emit();
    this.store.selectOnce<UserStateModel>(UserState).subscribe((user) => {
      this.uploadService.uploadRecordingFile(this.fileList.pop()!, user.isLogged).then(response => {
        console.log(response);
        this.uploading = false;
        this.result.emit(response);
    });
    })
  }
}
