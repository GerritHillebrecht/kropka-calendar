import { firestore } from 'firebase/app';
import { Role } from './role.model';
import { UserProfile } from '../auth';

export interface Shift {
  uid?: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  role: Role;
  color: string;
  userProfile: UserProfile;
  seenByEmployee: boolean;
  updateSeenByEmployee?: boolean;
  preliminary: boolean;
  createdAt: firestore.Timestamp;
  createdBy: string;
}

export interface UpdateShiftModel extends Partial<Shift> {}
