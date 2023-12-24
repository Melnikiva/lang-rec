import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService, LoginData, RegisterData } from '../upload-service/auth.service';
import { RegisterComponent } from '../register/register.component';
import { Store } from '@ngxs/store';
import { SetUser } from '../state/user.state';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.less',
  providers: [AuthService]
})
export class LoginPageComponent { 
  isLogin = true;

  constructor(
    private authService: AuthService, 
    private store: Store, 
    private msg: NzMessageService,
    private router: Router) {}

  toggleRegister() {
    this.isLogin = !this.isLogin;
  }

  submitLogin(loginData: LoginData) {
    this.authService.logIn(loginData).subscribe((res) => {
      if (res) {
        this.msg.success(`Loged In as ${loginData.email}`)
        this.store.dispatch(new SetUser(res));
        this.router.navigate(['upload']);
      }
    });
  }

  submitRegister(registerData: RegisterData) {
    this.authService.register(registerData).subscribe((res) => {
      if (res) {
        this.msg.success('Registered successfully!')
        this.toggleRegister();
      }
    })
  }
}
