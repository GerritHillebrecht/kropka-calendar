import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  UserProfile,
  Role,
  Shift,
  CalendarEvent,
  UpdateShiftModel
} from '@app/core/models';
import { AuthService } from '@app/core/services/auth';
import { RoleService } from '@app/core/services/roles';
import { ScreenSizeService } from '@app/core/services/utility';

import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { firestore } from 'firebase/app';
import { DeleteShiftComponent } from '../delete-shift/delete-shift.component';
import { ShiftService } from '@app/core/services/shifts';
import { NotificationMessageService } from '@app/core/services/notification';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-show-shift',
  templateUrl: './dialog-show-shift.component.html',
  styleUrls: ['./dialog-show-shift.component.scss']
})
export class DialogShowShiftComponent implements OnInit {
  shiftForm: FormGroup;
  get roleControl() {
    return this.shiftForm.get('role') as FormControl;
  }

  userProfile: UserProfile;
  role: Role;
  roles: Role[];
  shift: Shift;

  adminStatus$: Observable<boolean>;

  constructor(
    // Dialog
    @Inject(MAT_DIALOG_DATA) public calendarEvent: CalendarEvent,
    private dialogRef: MatDialogRef<DialogShowShiftComponent>,
    private dialog: MatDialog,

    // Services
    private shiftService: ShiftService,
    private authService: AuthService,
    private roleService: RoleService,
    private notificationService: NotificationMessageService,
    public screenSizeService: ScreenSizeService,

    private fb: FormBuilder
  ) {
    this.adminStatus$ = this.authService.isAdmin$;
  }

  ngOnInit() {
    this.userProfile = this.calendarEvent.extendedProps.userProfile;
    this.role = this.calendarEvent.extendedProps.role;
    this.shift = this.calendarEvent.extendedProps.shift;

    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.roleControl.patchValue(
        this.roles.find(role => role.title === this.role.title)
      );
    });

    this.shiftForm = this.fb.group({
      role: ['', Validators.required],
      startTime: [
        moment(this.shift.start.toDate()).format('HH:mm'),
        Validators.required
      ],
      endTime: [
        moment(this.shift.end.toDate()).format('HH:mm'),
        Validators.required
      ],
      preliminary: [this.shift.preliminary, Validators.required]
    });
  }

  updateShift() {
    const { uid, userProfile, start, end } = this.calendarEvent.extendedProps
      .shift as Shift;
    const { startTime, endTime, role, preliminary } = this.shiftForm.value;

    const shift: UpdateShiftModel = {
      uid,
      role,
      color: role.color,
      preliminary,
      start: firestore.Timestamp.fromDate(
        moment(start.toDate())
          .hours(startTime.split(':')[0])
          .minutes(startTime.split(':')[1])
          .toDate()
      ),
      end: firestore.Timestamp.fromDate(
        moment(end.toDate())
          .hours(endTime.split(':')[0])
          .minutes(endTime.split(':')[1])
          .toDate()
      )
    };
    this.closeDialog();
    return this.shiftService.updateShift(shift).then(() =>
      this.notificationService.create({
        title: `${userProfile.name.full} aktualisiert.`
      })
    );
  }

  deleteShift() {
    return this.dialog
      .open(DeleteShiftComponent, {
        autoFocus: false,
        data: this.calendarEvent.extendedProps.shift,
        maxWidth: 'calc(100% - 32px)',
        width: '520px'
      })
      .afterClosed()
      .subscribe(result => (result ? this.closeDialog() : null));
  }

  closeDialog() {
    return this.dialogRef.close();
  }
}
