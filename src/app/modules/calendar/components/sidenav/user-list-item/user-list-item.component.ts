import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '@app/core/models';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() userProfile: UserProfile;

  constructor() {}

  ngOnInit() {}
}
