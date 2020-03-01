import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-dialog-delete-event',
  templateUrl: './dialog-delete-event.component.html',
  styleUrls: ['./dialog-delete-event.component.scss']
})
export class DialogDeleteEventComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogDeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) public calendarEvent: EventApi
  ) {}

  ngOnInit() {}

  closeDialog(result?: boolean) {
    return this.dialogRef.close(result ? result : false);
  }
}
