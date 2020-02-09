import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firebaseCollections } from '@app/core/configs';
import { shareReplay } from 'rxjs/operators';
import { Event } from '@app/core/models';
import { NotificationMessageService } from '../notification';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private db: AngularFirestore,
  ) {}

  getEvents(start: Date, end: Date): Observable<Event[]> {
    return this.db
      .collection<Event>(firebaseCollections.events, ref =>
        ref.where('start', '>=', start).where('start', '<=', end)
      )
      .valueChanges({ idField: 'uid' })
      .pipe(shareReplay(1));
  }

  addEvent(event: Event): Promise<DocumentReference> {
    return this.db.collection<Event>(firebaseCollections.events).add(event);
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.db
      .collection<Event>(firebaseCollections.events)
      .doc<Event>(eventId)
      .delete();
  }
}
