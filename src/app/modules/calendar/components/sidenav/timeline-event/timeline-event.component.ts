import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Shift } from '@app/core/models';

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit, AfterViewInit {
  @Input() shift: Shift;
  @Input() passedEvent = false;
  @Input() nextShift = false;

  @ViewChild('timelineEvent', { static: true }) timelineEvent: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.timelineEvent.nativeElement.style.setProperty(
      '--time-point-role-color',
      this.shift.role.color
    );
  }
}
