import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@app/core/models';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit {
  userProfile$: Observable<UserProfile>;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserInterfaceComponent>
  ) {
    this.userProfile$ = this.authService.userProfile$;
  }

  ngOnInit() {}

  signOff(): Promise<void> {
    this.closeDialog();
    return this.authService.signOut();
  }

  closeDialog() {
    return this.dialogRef.close();
  }
}
