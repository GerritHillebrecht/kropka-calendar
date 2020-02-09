import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationMessage } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {
  notificationMessage$ = new Subject<NotificationMessage>();

  create(message: NotificationMessage) {
    this.notificationMessage$.next(message);
  }
}
