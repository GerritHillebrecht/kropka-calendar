import { firestore } from 'firebase/app';

export interface Event {
  uid?: string;
  title: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  color?: string;
  description?: string;
  previewImage?: string;
}
