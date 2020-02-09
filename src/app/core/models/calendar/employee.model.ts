import { Role } from './role.model';
import { firestore } from 'firebase/app';

export interface Employee {
  uid?: string;
  name: {
    first?: string;
    last?: string;
    full?: string;
    alias?: string;
    fullName?: string;
  };
  role: Role;
  avatar: string;
  birthday: firestore.Timestamp;
}
