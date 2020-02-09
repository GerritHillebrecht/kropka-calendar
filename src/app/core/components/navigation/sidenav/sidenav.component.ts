import { Component, OnInit } from '@angular/core';
import {
  NavigationService,
  SidenavService
} from '@app/core/services/navigation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(
    public navigationService: NavigationService,
    public sidenavService: SidenavService
  ) {}

  ngOnInit() {}
}
