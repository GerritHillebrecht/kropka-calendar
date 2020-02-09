import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Page {
  label: string;
  desc?: string;
  path: string;
  icon?: string;
  [x: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navbarTransparent$ = new BehaviorSubject<boolean>(false);

  pages: Page[] = [
    {
      label: 'Projektplanung',
      path: '/planning',
      icon: 'event'
    },
    {
      label: 'Reisekosten',
      path: '/travelexpenses',
      icon: 'train'
    },
    {
      label: 'Urlaubsanträge',
      path: '/vacation',
      icon: 'local_airport'
    }
  ];

  pages$: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(this.pages);

  constructor() {}
}
