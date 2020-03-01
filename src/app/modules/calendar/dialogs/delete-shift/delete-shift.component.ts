import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from '@app/core/models';
import { ShiftService } from '@app/core/services/shifts';
import { NotificationMessageService } from '@app/core/services/notification';

@Component({
  selector: 'app-delete-shift',
  templateUrl: './delete-shift.component.html',
  styleUrls: ['./delete-shift.component.scss']
})
export class DeleteShiftComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public shift: Shift,
    private dialogRef: MatDialogRef<DeleteShiftComponent>,
    private shiftService: ShiftService,
    private notificationService: NotificationMessageService
  ) {}

  ngOnInit() {}

  closeDialog(result?: boolean) {
    return this.dialogRef.close(result ? result : false);
  }

  deleteShift(): Promise<void> {
    this.closeDialog(true);
    return this.shiftService.deleteShift(this.shift.uid).then(() =>
      this.notificationService.create({
        title: `${this.shift.userProfile.name.full}s Schicht gelöscht.`
      })
    );
  }
}
