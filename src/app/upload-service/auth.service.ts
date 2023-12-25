import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UserStateModel } from "../state/user.state";
import { SERVER_ENDPOINT } from "./constants";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    first_name: string;
    last_name: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private msg: NzMessageService) {}

    logIn(userData: LoginData) {
        return this.http.post<UserStateModel>(SERVER_ENDPOINT + '/authentication/login', userData);
    }
    register(userData: RegisterData) {
        return this.http.post(SERVER_ENDPOINT + '/authentication/register', userData);
    }
}