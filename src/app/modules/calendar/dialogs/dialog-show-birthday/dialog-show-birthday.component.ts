import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import confetti from 'canvas-confetti';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserProfile } from '@app/core/models';

@Component({
  selector: 'app-dialog-show-birthday',
  templateUrl: './dialog-show-birthday.component.html',
  styleUrls: ['./dialog-show-birthday.component.scss']
})
export class DialogShowBirthdayComponent implements OnInit, OnDestroy {
  birthdayInterval;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userProfile: UserProfile,
    private dialogRef: MatDialogRef<DialogShowBirthdayComponent>
  ) {
    console.log(userProfile);
  }

  ngOnInit() {
    this.goParty();
    this.birthdayInterval = setInterval(() => this.goParty(), 2500);
  }

  ngOnDestroy() {
    clearInterval(this.birthdayInterval);
  }

  goParty() {
    confetti({
      particleCount: 200,
      zIndex: 1001,
      spread: 70
    });
  }

  closeDialog() {
    return this.dialogRef.close();
  }
}
