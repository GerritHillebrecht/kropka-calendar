import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  timelineOpened$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggleTimeline(state?: boolean) {
    return this.timelineOpened$.next(
      state !== undefined ? state : !this.timelineOpened$.getValue()
    );
  }
}
