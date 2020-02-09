import { Component, OnInit } from '@angular/core';
import { CalendarService } from '@app/core/services/calendar';

import * as moment from 'moment';
import { Shift, UserProfile } from '@app/core/models';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth';
import { ScreenSizeService } from '@app/core/services/utility';
import { ShiftService } from '@app/core/services/shifts';

@Component({
  selector: 'app-calendar-ui',
  templateUrl: './calendar-ui.component.html',
  styleUrls: ['./calendar-ui.component.scss']
})
export class CalendarUiComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  latestShifts$: Observable<Shift[]>;
  today: Date = new Date();

  constructor(
    public calendarService: CalendarService,
    private authService: AuthService,
    public screenSizeService: ScreenSizeService,
    private shiftService: ShiftService
  ) {
    this.userProfile$ = this.authService.userProfile$;
  }

  ngOnInit() {
    this.userProfile$.subscribe(user => {
      console.log('latest Shifts', user);
      return user
        ? (this.latestShifts$ = this.calendarService.getUnseenShifts(user.uid))
        : null;
    });
  }

  getMonthIndicator(direction: 'next' | 'prev'): Date {
    const ref = moment(this.calendarService.calendarApi.getDate());
    return direction === 'next'
      ? ref.add(1, 'month').toDate()
      : ref.subtract(1, 'month').toDate();
  }

  changeMonth(direction: 'next' | 'prev') {
    return direction === 'next'
      ? this.calendarService.next()
      : this.calendarService.previous();
  }

  onToday(): void {
    return this.calendarService.today();
  }

  newNotifications(shifts: Shift[]): Shift[] {
    return shifts ? shifts.filter(shift => shift.seenByEmployee === false) : [];
  }

  fromNow(date: Date): string {
    return moment(date)
      .locale('de')
      .fromNow();
  }

  updateSeenStatus() {
    this.latestShifts$
      .subscribe(shifts =>
        shifts.forEach(shift =>
          this.shiftService.updateShift({
            uid: shift.uid,
            seenByEmployee: true
          })
        )
      )
      .unsubscribe();
  }
}
