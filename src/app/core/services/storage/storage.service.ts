import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { UserProfile } from '@app/core/models';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  task: AngularFireUploadTask;

  percentage$: Observable<number>;
  snapshot$: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  updateAvatar(file: File, user: UserProfile) {
    console.log({ file, user });

    // The storage path
    const path = `images/users/${user.uid}/${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // the main task
    this.task = this.storage.upload(path, file);

    // progress monitoring
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        console.log('FERTIG');
        this.downloadURL = await ref.getDownloadURL().toPromise();
        await this.authService.updateUserData({
          ...user,
          photoURL: this.downloadURL
        });
      })
    );
    this.snapshot$.subscribe();
  }
}
