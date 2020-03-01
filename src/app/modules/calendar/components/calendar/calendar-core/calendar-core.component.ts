import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Observable } from 'rxjs';
import {
  CalendarEvent,
  Shift,
  UpdateShiftModel,
  Event
} from '@app/core/models';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService } from '@app/core/services/calendar';
import { ScreenSizeService } from '@app/core/services/utility';
import { MatDialog } from '@angular/material/dialog';
import { DialogShowEventComponent } from '@app/modules/calendar/dialogs/dialog-show-event/dialog-show-event.component';
import { EventApi } from '@fullcalendar/core';
import { ShiftService } from '@app/core/services/shifts';
import { firestore } from 'firebase/app';
import * as moment from 'moment';
import { NotificationMessageService } from '@app/core/services/notification';

import { trigger, keyframes, animate, transition } from '@angular/animations';

import * as animations from '@core/animations';
import { DialogShowShiftComponent } from '@app/modules/calendar/dialogs/dialog-show-shift/dialog-show-shift.component';
import { DialogShowBirthdayComponent } from '@app/modules/calendar/dialogs/dialog-show-birthday/dialog-show-birthday.component';

@Component({
  selector: 'app-calendar-core',
  templateUrl: './calendar-core.component.html',
  styleUrls: ['./calendar-core.component.scss'],
  animations: [
    trigger('calendarAnimator', [
      transition('* => left', animate(125, keyframes(animations.leftFade))),
      transition('* => right', animate(125, keyframes(animations.rightFade)))
    ])
  ]
})
export class CalendarCoreComponent implements OnInit, AfterViewInit {
  plugins = [dayGridPlugin, interactionPlugin];

  calendarEvents$: Observable<CalendarEvent[]>;

  @ViewChild('calendar', null) calendar: FullCalendarComponent;

  constructor(
    public calendarService: CalendarService,
    public screenSizeService: ScreenSizeService,
    private dialog: MatDialog,
    private shiftService: ShiftService,
    private notificationService: NotificationMessageService
  ) {
    this.calendarEvents$ = this.calendarService.calendarEvents$;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.calendarService.calendarApi = this.calendar.getApi();
    this.calendarService.currentDateRange$.next({
      start: this.calendarService.calendarApi.view.activeStart,
      end: this.calendarService.calendarApi.view.activeEnd
    });
    setTimeout(() => {
      this.calendarService.calendarApi.updateSize();
    }, 1);
  }

  onEventClick(event: EventApi) {
    switch (event.extendedProps.type) {
      case 'shift':
        this.openShiftDialog(event);
        break;
      case 'event':
        this.openEventDialog(event);
        break;
      case 'birthday':
        this.openBirthdayDialog(event);
        break;
    }
  }

  private openShiftDialog(event: EventApi) {
    return this.dialog.open(DialogShowShiftComponent, {
      data: event,
      autoFocus: false,
      width: '400px',
      maxWidth: '90vw',
      panelClass: ['dialog-show-overflow']
    });
  }

  private openEventDialog(event: EventApi) {
    return this.dialog.open(DialogShowEventComponent, {
      data: event,
      autoFocus: false,
      width: '400px',
      maxWidth: '90vw'
    });
  }

  private openBirthdayDialog(event: EventApi) {
    return this.dialog.open(DialogShowBirthdayComponent, {
      data: event.extendedProps.userProfile,
      autoFocus: false,
      width: '400px',
      maxWidth: '90vw',
      panelClass: ['dialog-show-overflow']
    });
  }

  onDateClick(event) {
    console.log(event);
  }

  onEventUpdate(event) {
    return event.extendedProps.type === 'shift'
      ? this.updateShift(
          event.extendedProps.shift as Shift,
          event.start,
          event.end
        )
      : null;
  }

  private updateShift({ uid, userProfile }: Shift, start, end) {
    const updatedShift: UpdateShiftModel = {
      uid,
      start: firestore.Timestamp.fromDate(start),
      end: firestore.Timestamp.fromDate(end)
    };

    return this.shiftService.updateShift(updatedShift).then(() =>
      this.notificationService.create({
        title: `${userProfile.name.full} aktualisiert.`
      })
    );
  }

  onExternalEventDrop(event: EventApi) {
    const { start, extendedProps } = event;
    const { role, userProfile } = extendedProps;
    event.remove();

    const shift: Shift = {
      start: firestore.Timestamp.fromDate(start),
      end: firestore.Timestamp.fromDate(
        moment(start)
          .hours(role.shiftEnd.hour)
          .minutes(role.shiftEnd.minute)
          .toDate()
      ),
      color: role.color,
      role,
      seenByEmployee: false,
      preliminary: false,
      userProfile,
      createdAt: firestore.Timestamp.now(),
      createdBy: userProfile.name.full
    };

    console.log(shift);
    return this.shiftService.addShift(shift).then(() =>
      this.notificationService.create({
        title: `${shift.userProfile.name.full} erfolgreich angelegt.`
      })
    );
  }
}
