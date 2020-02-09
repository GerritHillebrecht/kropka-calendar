import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavContainerComponent } from './navigation/sidenav-container/sidenav-container.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { MaterialDesignModule } from '../material-design';
import { RouterModule } from '@angular/router';
import { UserUiComponent } from './navigation/user-ui/user-ui.component';
import { RainbowBarComponent } from './navigation/rainbow-bar/rainbow-bar.component';
import { CalendarUiComponent } from './navigation/calendar-ui/calendar-ui.component';
import { UserInterfaceComponent } from './dialogs/user-interface/user-interface.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    SidenavContainerComponent,
    SidenavComponent,
    NavbarComponent,
    UserUiComponent,
    RainbowBarComponent,
    CalendarUiComponent,
    UserInterfaceComponent
  ],
  imports: [CommonModule, RouterModule, MaterialDesignModule, SharedModule],
  exports: [SidenavContainerComponent, NavbarComponent, RainbowBarComponent],
  entryComponents: [UserInterfaceComponent]
})
export class ComponentsModule {}
