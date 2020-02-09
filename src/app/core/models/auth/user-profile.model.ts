import { User, firestore } from 'firebase/app';
import { Name, ContactData } from './userMeta.model';
import { Role } from '../calendar';

export interface UserProfile extends Partial<User> {
  name?: Name;

  contact?: ContactData;
  birthday?: {
    date: firestore.Timestamp;
    month: number;
  };

  role?: Role;
}
