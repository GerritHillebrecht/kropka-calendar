import { firestore } from 'firebase/app';
import { Employee } from './employee.model';

export interface Event {
  uid?: string;
  title: string;
  employees?: Employee[];
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  color?: string;
  description?: string;
  previewImage?: string;
}
