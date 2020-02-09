import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';

const routes: Routes = [
  { path: '', component: PageLoginComponent },
  { path: 'forgot-password', component: PageForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
