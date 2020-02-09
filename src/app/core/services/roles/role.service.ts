import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '@app/core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { firebaseCollections } from '@app/core/configs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private db: AngularFirestore) {}

  getRoles(): Observable<Role[]> {
    return this.db
      .collection<Role>(firebaseCollections.roles, ref =>
        ref.orderBy('title', 'asc')
      )
      .valueChanges({ idFiel: 'uid' })
      .pipe(shareReplay(1));
  }
}
