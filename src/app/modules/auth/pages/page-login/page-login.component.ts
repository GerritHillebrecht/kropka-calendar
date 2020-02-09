import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from '@app/core/services/auth';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  showPassword: boolean = false;
  authForm: FormGroup;
  get email() {
    return this.authForm.get('email') as FormControl;
  }
  get password() {
    return this.authForm.get('password') as FormControl;
  }

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    return this.authService.emailLogin(this.email.value, this.password.value);
  }
}
