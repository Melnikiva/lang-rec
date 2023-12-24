import { Component, Output } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WavRecorder } from "webm-to-wav-converter";
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-record-area',
  templateUrl: './record-area.component.html',
  styleUrl: './record-area.component.less',
  standalone: true,
  imports: [NzButtonModule, CommonModule, NzIconModule]
})
export class RecordAreaComponent {
  @Output() recordingCallback = new EventEmitter();
  private wavRecorder = new WavRecorder();
  isRecording = false;

  constructor(private msg: NzMessageService) {
}

startRecording() {
  this.wavRecorder.start();
  this.isRecording = true;
}

stopRecording() {
   this.wavRecorder.stop();
   this.isRecording = false;
   const ctx = this;
   setTimeout(function () {
    const wavBlob = ctx.wavRecorder.getBlob();
    ctx.recordingCallback.emit(wavBlob);
   }, 500)
}
}
