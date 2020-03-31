import { Component, OnInit, Input } from '@angular/core';
import { ShiftService } from '@app/core/services/shifts';
import { Shift } from '@app/core/models';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming-events-list',
  templateUrl: './upcoming-events-list.component.html',
  styleUrls: ['./upcoming-events-list.component.scss']
})
export class UpcomingEventsListComponent implements OnInit {
  shifts$: Observable<Shift[]>;

  constructor(
    public shiftService: ShiftService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.shifts$ = this.shiftService.getUpcomingShifts(this.afAuth.auth.currentUser.uid);
  }
}
