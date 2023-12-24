import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext } from '@ngxs/store';
import { UploadService } from '../upload-service/upload.service';
import { HistoryData } from '../history-page/history';

export interface HistoryResponse {
    queryHistory: HistoryData[];
}

export interface UserStateModel {
   token?: string;
   isLogged: boolean;
   history: HistoryData[]
}

export class SetUser {
    static readonly type = '[User] SetUser';
    constructor(public user: UserStateModel) {}
}

export class LogOut {
    static readonly type = '[User] LogOut';
}

export class LoadHistory {
    static readonly type = '[User] LoadHistory';
}

export class UploadRecording {
    static readonly type = '[User] UploadRecording';
    constructor(public recording: any) {}
}

@State<UserStateModel>({
    name: 'user',
})
@Injectable()
export class UserState {
    constructor(private uploadService: UploadService) {}

    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
        const state = ctx.getState();
        // this.uploadService.getHistory().subscribe((res) => {
        //     console.log('HISTORY');
        //     console.log(res);
        // });
        ctx.setState({
            ...state,
            token: action.user.token,
            isLogged: true
        });
    }

    @Action(LogOut)
    logOut(ctx: StateContext<UserStateModel>) {
        ctx.setState({
            history: [],
            token: undefined,
            isLogged: false
        })
    }

    @Action(LoadHistory)
    loadHistory(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        if (state.isLogged) {
            this.uploadService.getHistory(state.token!).subscribe((res) => {
                ctx.patchState({
                    history: res.queryHistory,
                })
            });
        }
    }

    @Action(UploadRecording)
    uploadRecording(ctx: StateContext<UserStateModel>, action: UploadRecording) {
        const state = ctx.getState();
        if (state.isLogged) {
            this.uploadService.uploadRecordingFile(action.recording)
        }
    }
}