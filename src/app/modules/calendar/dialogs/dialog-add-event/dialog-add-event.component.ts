import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ScreenSizeService } from '@app/core/services/utility';
import { MatDialogRef } from '@angular/material';
import { EventService } from '@app/core/services/events';
import { Event, UserProfile } from '@app/core/models';

import * as moment from 'moment';
import { firestore } from 'firebase/app';
import { NotificationMessageService } from '@app/core/services/notification';
import { UserService } from '@app/core/services/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-event',
  templateUrl: './dialog-add-event.component.html',
  styleUrls: ['./dialog-add-event.component.scss']
})
export class DialogAddEventComponent implements OnInit {
  users$: Observable<UserProfile[]>;
  addEventForm: FormGroup;
  get title() {
    return this.addEventForm.get('title') as FormControl;
  }
  get start() {
    return this.addEventForm.get('start') as FormControl;
  }
  get startTime() {
    return this.addEventForm.get('startTime') as FormControl;
  }
  get end() {
    return this.addEventForm.get('end') as FormControl;
  }
  get endTime() {
    return this.addEventForm.get('endTime') as FormControl;
  }
  get description() {
    return this.addEventForm.get('description') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    public screenSizeService: ScreenSizeService,
    private dialogRef: MatDialogRef<DialogAddEventComponent>,
    private eventService: EventService,
    private notificationService: NotificationMessageService,
    private userService: UserService
  ) {
    this.users$ = this.userService.getUsers();
  }

  ngOnInit() {
    this.addEventForm = this.fb.group({
      start: [new Date(), Validators.required],
      startTime: ['19:00', Validators.required],
      end: [new Date(), Validators.required],
      endTime: ['23:00', Validators.required],
      title: ['', Validators.required],
      description: ['']
    });
  }

  onAddEvent() {
    if (this.addEventForm.invalid) {
      return this.addEventForm.markAllAsTouched();
    }

    const event: Event = this.createEvent();

    return this.eventService
      .addEvent(event)
      .then(() =>
        this.notificationService.create({
          title: `${event.title} angelegt.`
        })
      )
      .catch((error: Error) =>
        this.notificationService.create({
          title: error.message
        })
      )
      .finally(() => {
        this.closeDialog();
      });
  }

  private createEvent(): Event {
    return {
      title: this.title.value as string,
      start: firestore.Timestamp.fromDate(
        moment(this.start.value as Date)
          .hours(this.startTime.value.split(':')[0])
          .minutes(this.startTime.value.split(':')[1])
          .toDate()
      ),
      end: firestore.Timestamp.fromDate(
        moment(this.end.value as Date)
          .hours(this.endTime.value.split(':')[0])
          .minutes(this.endTime.value.split(':')[1])
          .toDate()
      ),
      description: this.addEventForm.get('description').value
    };
  }

  closeDialog() {
    return this.dialogRef.close();
  }
}
