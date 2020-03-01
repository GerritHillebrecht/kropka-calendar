import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { UserInterfaceComponent } from '../../dialogs/user-interface/user-interface.component';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUiComponent implements OnInit {
  constructor(public authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {}

  userInterface() {
    return this.dialog.open(UserInterfaceComponent, {
      width: '354px',
      // maxWidth: '96vw',
      autoFocus: false,
      panelClass: ['dialog-show-overflow']
    });
  }
}
