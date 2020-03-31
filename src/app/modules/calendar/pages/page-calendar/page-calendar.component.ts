import { Component, OnInit } from '@angular/core';

import { ScreenSizeService } from '@app/core/services/utility';
import { CalendarService } from '@app/core/services/calendar';
import { AuthService } from '@app/core/services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-calendar',
  templateUrl: './page-calendar.component.html',
  styleUrls: ['./page-calendar.component.scss']
})
export class PageCalendarComponent implements OnInit {
  animationState: string;
  isAdmin$: Observable<boolean>;

  constructor(
    public screenSizeService: ScreenSizeService,
    public calendarService: CalendarService,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit() {}

  onSwipe(event) {
    return this.screenSizeService.isHandset$
      .subscribe(result => {
        if (!result) {
          return;
        }
        event.deltaX > 0
          ? this.calendarService.previous()
          : this.calendarService.next();
      })
      .unsubscribe();
  }

}
