import { firestore } from 'firebase/app';
import { UserProfile } from '../auth';

export interface Event {
  uid?: string;
  title: string;
  employees?: UserProfile[];
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  color?: string;
  description?: string;
  previewImage?: string;
}
