import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShiftService } from '@app/core/services/shifts';
import { Shift } from '@app/core/models';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  shifts$: Observable<Shift[]>;
  pastShifts$: Observable<Shift[]>;

  constructor(
    public shiftService: ShiftService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.shifts$ = this.shiftService.getUpcomingShifts(
      this.afAuth.auth.currentUser.uid
    );
    this.pastShifts$ = this.shiftService.getPastShifts(
      this.afAuth.auth.currentUser.uid
    );
  }

  updateShifts() {
    combineLatest([this.shifts$, this.pastShifts$])
      .pipe(
        take(1),
        tap(results => {
          const shifts = [...results[0], ...results[1]] as Shift[];
          const shiftsToUpdate = shifts.filter(
            shift => !shift.seenByEmployee || !shift.updateSeenByEmployee
          );
          console.log(shiftsToUpdate);
          this.shiftService.updateSeenStatus(shiftsToUpdate);
        })
      )
      .subscribe();
  }
}
