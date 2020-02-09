import { Component, OnInit } from '@angular/core';
import { SidenavService } from '@app/core/services/navigation';
import { ScreenSizeService } from '@app/core/services/utility';

@Component({
  selector: 'app-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss']
})
export class SidenavContainerComponent implements OnInit {
  constructor(
    public sidenavService: SidenavService,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit() {}
}
