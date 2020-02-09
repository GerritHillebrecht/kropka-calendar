import { Injectable } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { switchMap, shareReplay, map, tap } from 'rxjs/operators';
import { ShiftService } from '../shifts';
import { ConversionService } from './conversion.service';
import { CalendarEvent, Shift, UserProfile } from '@app/core/models';
import { UserService } from '../users';
import { EventService } from '../events';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarApi: Calendar;
  currentDateRange$ = new BehaviorSubject<{ start: Date; end: Date }>(null);
  calendarEvents$: Observable<CalendarEvent[]>;
  calendarLoading$ = new BehaviorSubject<boolean>(false);
  calendarSidenavOpened$ = new BehaviorSubject<boolean>(false);
  calendarAnimationState: string;

  constructor(
    private shiftService: ShiftService,
    private conversionService: ConversionService,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.calendarEvents$ = this.currentDateRange$.pipe(
      switchMap(dateRange => {
        return dateRange
          ? this.getCalendarEventsForDateRange(dateRange.start, dateRange.end)
          : of(null);
      }),
      shareReplay(1)
    );
  }

  next(): void {
    this.calendarApi.next();
    this.startAnimation('left');
    return this.updateDateRange();
  }

  previous(): void {
    this.calendarApi.prev();
    this.startAnimation('right');
    return this.updateDateRange();
  }

  today(): void {
    this.calendarApi.today();
    return this.updateDateRange();
  }

  switchView() {
    return this.calendarApi.changeView('dayGridWeek');
  }

  startAnimation(state: string) {
    console.log(state);
    if (!this.calendarAnimationState) {
      this.calendarAnimationState = state;
    }
  }

  resetAnimationState() {
    this.calendarAnimationState = '';
  }

  updateDateRange(): void {
    return this.currentDateRange$.next({
      start: this.calendarApi.view.activeStart,
      end: this.calendarApi.view.activeEnd
    });
  }

  toggleCalendarSidenav() {
    return this.calendarSidenavOpened$.next(
      !this.calendarSidenavOpened$.getValue()
    );
  }

  openCalendarSidenav(): void {
    return this.calendarSidenavOpened$.next(true);
  }

  closeCalendarSidenav(): void {
    return this.calendarSidenavOpened$.next(false);
  }

  getUsers(): Observable<UserProfile[]> {
    return this.userService.getUsers();
  }

  getCalendarEventsForDateRange(
    start: Date,
    end: Date
  ): Observable<CalendarEvent[]> {
    this.calendarLoading$.next(true);
    return combineLatest(
      this.shiftService
        .getShiftsforDateRange(start, end)
        .pipe(
          map(shifts =>
            shifts.map(shift =>
              this.conversionService.convertShiftToCalendarEvent(shift)
            )
          )
        ),
      this.userService
        .getBirthdays(moment(this.calendarApi.getDate()).month())
        .pipe(
          map(birthdays =>
            birthdays.map(dob =>
              this.conversionService.convertBirthdayToCalendarEvent(
                dob,
                moment(this.calendarApi.getDate()).year()
              )
            )
          )
        ),
      this.eventService.getEvents(start, end).pipe(
        map(events =>
          events.map(event =>
            this.conversionService.convertEventToCalendarEvent(event)
          )
        )
        // tap(console.log)
      )
    ).pipe(
      map(results => [...results[0], ...results[1], ...results[2]]),
      // tap(console.log),
      tap(() => this.calendarLoading$.next(false))
    );
  }

  getUnseenShifts(userId: string): Observable<Shift[]> {
    return this.shiftService.getUnseenShifts(userId);
  }
}
