import { Component, OnInit, Input } from '@angular/core';
import {
  SidenavService,
  NavigationService
} from '@app/core/services/navigation';
import { AuthService } from '@app/core/services/auth';
import { ScreenSizeService } from '@app/core/services/utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navShadow: boolean = false;
  @Input() navBorder: boolean = false;

  constructor(
    public sidenavService: SidenavService,
    public navigationService: NavigationService,
    public authService: AuthService,
    public screenSizeService: ScreenSizeService,
  ) {

  }

  ngOnInit() {}
}
