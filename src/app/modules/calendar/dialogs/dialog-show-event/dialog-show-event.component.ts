import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from '@angular/material/dialog';

// Models
import { Event } from '@app/core/models';

// Types
import { EventApi } from '@fullcalendar/core';

// Services
import { AuthService } from '@app/core/services/auth';
import { ScreenSizeService } from '@app/core/services/utility';

// Dialogs
import { DialogDeleteEventComponent } from '../dialog-delete-event/dialog-delete-event.component';

// Libraries
import * as moment from 'moment';


@Component({
  selector: 'app-dialog-show-event',
  templateUrl: './dialog-show-event.component.html',
  styleUrls: ['./dialog-show-event.component.scss']
})
export class DialogShowEventComponent implements OnInit {
  calendarEvent: Event;

  constructor(
    @Inject(MAT_DIALOG_DATA) public event: EventApi,
    private dialogRef: MatDialogRef<DialogShowEventComponent>,
    private dialog: MatDialog,
    public authService: AuthService,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit() {
    this.calendarEvent = this.event.extendedProps.event;
    console.log(this.calendarEvent)
  }

  deleteEvent() {
    this.dialog.open(DialogDeleteEventComponent, {
      autoFocus: false,
      data: this.event,
      maxWidth: 'calc(100% - 32px)',
      width: '520px'
    });
  }

  closeDialog() {
    return this.dialogRef.close();
  }
}
