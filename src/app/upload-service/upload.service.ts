import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable } from "rxjs";

const SERVER_ENDPOINT = 'https://0dd8-37-55-254-212.ngrok-free.app';

@Injectable()
export class UploadService {
    constructor(private http: HttpClient, private msg: NzMessageService) {}

    uploadRecordingBlob(recording: Blob) {
        const file: File = new File([recording], 'recording.wav');
        let data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('type', 'Audio');

        return this.http.post(SERVER_ENDPOINT + '/language/recognize', data).subscribe(response => {
            console.log(response);
            this.msg.info(response.toString());
        }); 
    }

    uploadRecordingFile(recording: any): Observable<ResponseData> {
        let data: FormData = new FormData();
        data.append('file', recording);
        data.append('type', 'Audio');

        return this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data) 
    }

    getHistory() {
        return this.http.get(SERVER_ENDPOINT + '/language/query-history')
    }
}

export interface ResponseData {
    file_name: string;
    language: string;
    text: string;
  }