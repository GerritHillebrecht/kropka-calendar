import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { MaterialDesignModule } from '@app/core/material-design';
import { SharedModule } from '@app/shared';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';


@NgModule({
  declarations: [PageLoginComponent, PageForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialDesignModule,
    SharedModule
  ]
})
export class AuthModule { }
