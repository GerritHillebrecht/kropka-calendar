import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    public navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigationService.navbarTransparent$.next(
          event.urlAfterRedirects !== '/planning'
        );
      }
    });
  }
}
