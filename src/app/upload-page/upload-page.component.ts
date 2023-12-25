import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManualUploadComponent } from '../manual-upload/manual-upload.component';
import { RecordAreaComponent } from '../record-area/record-area.component';
import { ResponseData, UploadService } from '../upload-service/upload.service';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { BehaviorSubject } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngxs/store';
import { UserState, UserStateModel } from '../state/user.state';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    ManualUploadComponent,
    RecordAreaComponent,
    NzStepsModule,
    NzCardModule,
    NzButtonModule
  ],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.less',
})
export class UploadPageComponent { 
  currentStep = new BehaviorSubject<number>(0);
  showResult = false;
  result: ResponseData = {
    file_name: '',
    language: '',
    text: ''
  };
  constructor(private uploadService: UploadService, private store: Store) {
    this.currentStep.next(0);
    this.currentStep.subscribe((step) => {
      if (step === 3) {
        this.showResult = true;
      }
    })
  }

  recordingCallback(event: Promise<Blob>) {
    event.then((wavBlob) => {
      this.currentStep.next(1);
      this.store.select<UserStateModel>(UserState).subscribe((user) => {
        this.uploadService.uploadRecordingBlob(wavBlob, user.isLogged).then((res) => {
          this.handleResult(res);
        });
      })
      setTimeout(() => {this.currentStep.next(2)}, 2000);
    })
  }
  manualUploadCallback() {
    this.currentStep.next(1);
    setTimeout(() => {this.currentStep.next(2)}, 2000);
  }

  handleResult(response: ResponseData) {
    this.currentStep.next(3);
    console.log(response);
    this.result = response;
  }

  restart() {
    this.currentStep.next(0);
    this.showResult = false;
  }
}