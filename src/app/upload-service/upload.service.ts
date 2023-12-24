import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { HistoryResponse, UserState, UserStateModel } from "../state/user.state";
import { HistoryData } from "../history-page/history";

const SERVER_ENDPOINT = 'https://0dd8-37-55-254-212.ngrok-free.app';

@Injectable()
export class UploadService {
    constructor(
        private http: HttpClient, 
        private msg: NzMessageService, 
        private store: Store) {}

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

    async uploadRecordingFile(recording: any): Promise<ResponseData> {
        let data: FormData = new FormData();
        data.append('file', recording);
        data.append('type', 'Audio');
        const header = {
            headers: new HttpHeaders().set('Authorization',(await firstValueFrom(this.store.selectOnce<UserStateModel>(UserState))).token!).append("ngrok-skip-browser-warning", "69420")
        }
        return await firstValueFrom(this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data, header));
    }

    getHistory(token: string) {
        const header = {
            headers: new HttpHeaders().set('Authorization', token).append("ngrok-skip-browser-warning", "69420")
        }
        return this.http.get<HistoryResponse>(SERVER_ENDPOINT + '/language/query-history', header)
    }
}

export interface ResponseData {
    file_name: string;
    language: string;
    text: string;
  }