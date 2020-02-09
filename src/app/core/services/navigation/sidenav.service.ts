import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  toggleSidenav() {
    return this.sidenavOpened$.next(!this.sidenavOpened$.getValue());
  }

  openSidenav() {
    return this.sidenavOpened$.next(true);
  }

  closeSidenav() {
    return this.sidenavOpened$.next(false);
  }
}
