import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogAddEventComponent } from '@app/modules/calendar/dialogs/dialog-add-event/dialog-add-event.component';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss']
})
export class SidenavLayoutComponent implements OnInit {
  @Output() openEvent = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onAddEvent() {
    this.openEvent.emit();
    return this.dialog.open(DialogAddEventComponent);
  }
}
