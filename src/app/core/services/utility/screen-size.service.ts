import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );
  isPhone$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );
  isiPad$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.TabletLandscape, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
