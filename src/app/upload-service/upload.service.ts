import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { HistoryResponse, UserState, UserStateModel } from "../state/user.state";
import { HistoryData } from "../history-page/history";

const SERVER_ENDPOINT = 'https://c66c-31-144-101-244.ngrok-free.app';

@Injectable()
export class UploadService {
    constructor(
        private http: HttpClient, 
        private msg: NzMessageService, 
        private store: Store) {}

    async uploadRecordingBlob(recording: Blob, isLogged: boolean) {
        const file: File = new File([recording], 'recording.wav');
        let data: FormData = new FormData();
        data.append('file', file);
        data.append('type', 'Audio');

        if (isLogged) {
            const header = {
                headers: new HttpHeaders().set('Authorization',(await firstValueFrom(this.store.selectOnce<UserStateModel>(UserState))).token!).append("ngrok-skip-browser-warning", "69420")
            }
            return await firstValueFrom(this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data, header));
           }
            return await firstValueFrom(this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data));
    }

    async uploadRecordingFile(recording: any, isLogged: boolean): Promise<ResponseData> {
        let data: FormData = new FormData();
        data.append('file', recording);
        data.append('type', 'Audio');
       if (isLogged) {
        const header = {
            headers: new HttpHeaders().set('Authorization',(await firstValueFrom(this.store.selectOnce<UserStateModel>(UserState))).token!).append("ngrok-skip-browser-warning", "69420")
        }
        return await firstValueFrom(this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data, header));
       }
        return await firstValueFrom(this.http.post<ResponseData>(SERVER_ENDPOINT + '/language/recognize', data));
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