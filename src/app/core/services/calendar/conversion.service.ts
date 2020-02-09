import { Injectable } from '@angular/core';
import { Shift, CalendarEvent, Event, UserProfile } from '@app/core/models';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  constructor() {}

  convertShiftToCalendarEvent(shift: Shift): CalendarEvent {
    const { role, userProfile, start, end, color } = shift;

    const calendarEvent: CalendarEvent = {
      title: `${userProfile.name.full}`,
      start: start.toDate(),
      end: end.toDate(),
      color,
      roleTitle: role.title,
      extendedProps: {
        type: 'shift',
        shift,
        role,
        userProfile,
        color
      }
    };

    if (shift.preliminary) {
      calendarEvent.backgroundColor = 'white';
      calendarEvent.borderColor = shift.color;
      calendarEvent.textColor = shift.color;
    }

    return calendarEvent;
  }

  convertEventToCalendarEvent(event: Event): CalendarEvent {
    const { start, end, title, color, description, uid } = event;

    return {
      start: start.toDate(),
      end: end.toDate(),
      title,
      color: color ? color : '#808000',
      extendedProps: {
        type: 'event',
        event,
        description,
        uid
      },
      classNames: ['customEvent']
    };
  }

  convertBirthdayToCalendarEvent(
    user: UserProfile,
    year: number
  ): CalendarEvent {
    const calEvent: CalendarEvent = {
      allDay: true,
      title: `🎉 ${user.name.full}`,
      start: moment(user.birthday.date.toDate())
        .year(year)
        .toDate(),
      color: 'gold',
      // editable: false,
      extendedProps: {
        type: 'birthday',
        user: {
          uid: user.uid,
          name: user.name.full
        },
        userProfile: user
      }
    };

    return calEvent;
  }
}
