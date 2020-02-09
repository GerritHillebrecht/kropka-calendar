import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter
} from '@angular/core';

import { Draggable } from '@fullcalendar/interaction';
import { CalendarService } from '@app/core/services/calendar';
import { Observable } from 'rxjs';
import { UserProfile, Role } from '@app/core/models';
import { RoleService } from '@app/core/services/roles/role.service';
import { ScreenSizeService } from '@app/core/services/utility';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  users$: Observable<UserProfile[]>;
  roles$: Observable<Role[]>;

  @ViewChild('userCalendarEvents', null) userCalendarEvents: ElementRef;
  @ViewChildren('userEvent')
  userEvents: QueryList<ElementRef<HTMLElement>>;

  draggable: Draggable[];

  constructor(
    private calendarService: CalendarService,
    private screenSizeService: ScreenSizeService,
    private roleService: RoleService
  ) {
    this.users$ = this.calendarService.getUsers();
    this.roles$ = this.roleService.getRoles();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.userEvents.changes.subscribe(() => {
      this.userEvents.forEach(
        userEvent => (userEvent.nativeElement.style.touchAction = 'unset')
      );
      this.draggable = this.userEvents.map(userEvent => {
        const userProfile: UserProfile = JSON.parse(
          userEvent.nativeElement.getAttribute('data-eventData')
        );
        const { name, role } = userProfile;
        return new Draggable(userEvent.nativeElement, {
          longPressDelay: 251,
          // itemSelector: '.drag_handler',
          eventData: {
            title: name.full,
            color: role.color,
            startTime: role.shiftStart,
            extendedProps: { role, userProfile },
            create: true,
            allDay: false
          }
        });
      });
    });
  }

  pressEvent() {
    this.screenSizeService.isPhone$
      .subscribe(isPhone =>
        isPhone ? this.calendarService.closeCalendarSidenav() : null
      )
      .unsubscribe();
  }
}
