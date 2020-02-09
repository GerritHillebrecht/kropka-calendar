import { Shift } from './shift.model';
import { Role } from './role.model';
import { UserProfile } from '../auth';

export interface CalendarEvent {
  start: Date;
  end?: Date;

  title: string;
  color: string;

  allDay?: boolean;

  // decoratives
  classNames?: string[];

  // Optional
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;

  // editable
  editable?: boolean;

  // extended
  extendedProps?: ExtendedProps;

  // Wildcard
  [x: string]: any;
}

interface ExtendedProps {
  type?: 'shift' | 'event' | 'birthday';
  description?: string;
  shift?: Shift;
  role?: Role;
  userProfile?: UserProfile;
  [x: string]: any;
}
