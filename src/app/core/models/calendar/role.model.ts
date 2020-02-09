export interface Role {
  uid?: string;
  title: string;
  color: string;
  icon?: string;
  shiftStart: ShiftTime;
  shiftEnd: ShiftTime;
}

interface ShiftTime {
  hour: number;
  minute: number;
}
