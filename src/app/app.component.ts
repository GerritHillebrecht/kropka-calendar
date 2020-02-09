import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationMessageService } from './core/services/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private notificationService: NotificationMessageService
  ) {}
  ngOnInit() {
    this.notificationService.notificationMessage$.subscribe(notification =>
      this.snackbar.open(notification.title, 'Danke', {
        duration:
          notification.options && notification.options.duration
            ? notification.options.duration
            : 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      })
    );
  }
}
