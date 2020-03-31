import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  userForm: FormGroup;
  get name() {
    return this.userForm.get('name') as FormGroup;
  }
  get contact() {
    return this.userForm.get('contact') as FormGroup;
  }
  get email() {
    return this.contact.get('email') as FormControl;
  }
  get password() {
    return this.userForm.get('password') as FormControl;
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      photoURL: [''],
      role: ['', Validators.required],
      contact: this.fb.group({
        email: [''],
        phone: ['']
      }),
      birthday: [''],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.email.invalid || this.password.invalid) {
      return this.userForm.markAllAsTouched();
    }
    return this.submitUserData();
  }

  private submitUserData() {}
}
