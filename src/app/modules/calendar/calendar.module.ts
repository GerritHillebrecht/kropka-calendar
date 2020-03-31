import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MaterialDesignModule } from '@app/core/material-design';
import { SharedModule } from '@app/shared';

import { FullCalendarModule } from '@fullcalendar/angular';
import { PageCalendarComponent } from './pages/page-calendar/page-calendar.component';
import { CalendarCoreComponent } from './components/calendar/calendar-core/calendar-core.component';
import { DialogShowEventComponent } from './dialogs/dialog-show-event/dialog-show-event.component';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';
import { UserListComponent } from './components/sidenav/user-list/user-list.component';
import { UserListItemComponent } from './components/sidenav/user-list-item/user-list-item.component';
import { SidenavLayoutComponent } from './components/sidenav/sidenav-layout/sidenav-layout.component';
import { DialogAddEventComponent } from './dialogs/dialog-add-event/dialog-add-event.component';
import { ShowEventComponent } from './components/dialogs/show-event/show-event.component';
import { DeleteShiftComponent } from './dialogs/delete-shift/delete-shift.component';
import { DialogShowShiftComponent } from './dialogs/dialog-show-shift/dialog-show-shift.component';
import { DialogShowBirthdayComponent } from './dialogs/dialog-show-birthday/dialog-show-birthday.component';
import { DialogDeleteEventComponent } from './dialogs/dialog-delete-event/dialog-delete-event.component';
import { DialogAddUserComponent } from './dialogs/dialog-add-user/dialog-add-user.component';
import { UpcomingEventsListComponent } from './components/sidenav/upcoming-events-list/upcoming-events-list.component';
import { UpcomingEventComponent } from './components/sidenav/upcoming-event/upcoming-event.component';
import { TimelineComponent } from './components/sidenav/timeline/timeline.component';
import { TimelineEventComponent } from './components/sidenav/timeline-event/timeline-event.component';

@NgModule({
  declarations: [
    PageCalendarComponent,
    CalendarCoreComponent,
    CalendarLayoutComponent,
    UserListComponent,
    UserListItemComponent,
    SidenavLayoutComponent,
    ShowEventComponent,

    DialogShowEventComponent,
    DialogAddEventComponent,
    DeleteShiftComponent,
    DialogShowShiftComponent,
    DialogShowBirthdayComponent,
    DialogDeleteEventComponent,
    DialogAddUserComponent,
    UpcomingEventsListComponent,
    UpcomingEventComponent,
    TimelineComponent,
    TimelineEventComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MaterialDesignModule,
    SharedModule,
    FullCalendarModule
  ],
  entryComponents: [
    DialogAddEventComponent,
    DeleteShiftComponent,
    DialogDeleteEventComponent,

    DialogShowEventComponent,
    DialogShowShiftComponent,
    DialogShowBirthdayComponent
  ]
})
export class CalendarModule {}
