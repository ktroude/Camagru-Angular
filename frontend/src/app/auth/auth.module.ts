import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RecoverComponent } from './recover/recover.component';
import { AuthRequiredComponent } from './auth-required/auth-required.component';
import { NewPasswordComponent } from './new-password/new-password.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RecoverComponent,
    AuthRequiredComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
