import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Shift, UpdateShiftModel } from '@app/core/models/calendar';
import { firebaseCollections } from '@app/core/configs';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  constructor(private db: AngularFirestore) {}

  getShifts(): Observable<Shift[]> {
    return this.db
      .collection<Shift>(firebaseCollections.shifts)
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  getShiftsforDateRange(start: Date, end: Date): Observable<Shift[]> {
    console.log('Shifts requested');
    return this.db
      .collection<Shift>(firebaseCollections.shifts, ref =>
        ref.where('start', '>=', start).where('start', '<=', end)
      )
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  getUnseenShifts(userId: string): Observable<Shift[]> {
    // console.log(userId, 'userID');
    return this.db
      .collection<Shift>(firebaseCollections.shifts, ref =>
        ref
          // .where('seenByEmployee', '==', false)
          .where('start', '>=', new Date())
          .where('userProfile.uid', '==', userId)
          .where('preliminary', '==', false)
          .limit(5)
          .orderBy('start', 'desc')
          .orderBy('createdAt', 'desc')
      )
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  addShift(shift: Shift): Promise<DocumentReference> {
    return this.db.collection(firebaseCollections.shifts).add(shift);
  }

  updateShift(shift: UpdateShiftModel): Promise<void> {
    return this.db
      .collection<Shift>(firebaseCollections.shifts)
      .doc<Shift>(shift.uid)
      .update(shift);
  }

  deleteShift(shiftId: string): Promise<void> {
    return this.db
      .collection(firebaseCollections.shifts)
      .doc(shiftId)
      .delete();
  }
}
