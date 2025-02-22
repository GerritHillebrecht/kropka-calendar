import { Component, OnInit } from '@angular/core';

import { CalendarService } from '@app/core/services/calendar';
import { ScreenSizeService } from '@app/core/services/utility';
import { TimelineService } from '@app/core/services/calendar/timeline.service';

@Component({
  selector: 'app-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss']
})
export class CalendarLayoutComponent implements OnInit {
  constructor(
    public calendarService: CalendarService,
    public screenSizeService: ScreenSizeService,
    public timelineService: TimelineService
  ) {}

  ngOnInit() {}
}
