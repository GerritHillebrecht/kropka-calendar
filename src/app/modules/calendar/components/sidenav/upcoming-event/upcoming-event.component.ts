import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '@app/core/models';

@Component({
  selector: 'app-upcoming-event',
  templateUrl: './upcoming-event.component.html',
  styleUrls: ['./upcoming-event.component.scss']
})
export class UpcomingEventComponent implements OnInit {
  @Input() shift: Shift;

  constructor() {}

  ngOnInit(): void {}
}
