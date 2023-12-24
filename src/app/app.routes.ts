import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'upload', pathMatch: 'full' },
    { path: 'upload', component: UploadPageComponent },
    { path: 'history', component:  HistoryPageComponent},
    { path: 'login', component:  LoginPageComponent},
];
