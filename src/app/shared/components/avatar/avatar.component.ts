import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@app/core/services/auth';
import { UserProfile } from '@app/core/models';
import { StorageService } from '@app/core/services/storage';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatarSize: number = 50;
  @Input() avatarImage: string =
    '../../../../assets/images/defaults/avatar-example.jpg';
  @Input() avatarShadow: boolean = true;
  @Input() avatarBorderSize: string = '3px';
  @Input() avatarBorderStyle: string = 'solid';
  @Input() avatarBorderColor: string = 'white';
  @Input() avatarClickable: boolean = false;
  @Input() avatarSwitcherEnabled = false;

  imageLoading: boolean = true;

  percentage$: Observable<number>;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.percentage$ = this.storageService.percentage$;
  }

  ngOnInit() {}

  startUpload(file: File) {
    console.log('Upload Image Selected');
    return this.authService.userProfile$.pipe(
      take(1),
      tap((user: UserProfile) => {
        console.log('got user', user);
        return this.storageService.updateAvatar(file, user);
      })
    ).subscribe();
  }

  spinnersize(): number {
    return Math.round(this.avatarSize * 0.8);
  }
}
