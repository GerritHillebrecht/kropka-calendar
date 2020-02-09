import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '@app/core/models';
import { firebaseCollections } from '@app/core/configs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUsers(): Observable<UserProfile[]> {
    return this.db
      .collection(firebaseCollections.users, ref => ref.orderBy('name.full'))
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  getBirthdays(month: number): Observable<UserProfile[]> {
    return this.db
      .collection<UserProfile>(firebaseCollections.users, ref =>
        ref.where('birthday.month', '==', month)
      )
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  getUserById(userId: string): Observable<UserProfile> {
    return this.db
      .collection<UserProfile>(firebaseCollections.users)
      .doc<UserProfile>(userId)
      .valueChanges()
      .pipe(shareReplay(1));
  }
}
