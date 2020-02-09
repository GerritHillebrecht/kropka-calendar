import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { AuthService } from '@app/core/services/auth';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  get email() {
    return this.authForm.get('email') as FormControl;
  }
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    return this.authService.resendPassword(this.email.value);
  }
}
