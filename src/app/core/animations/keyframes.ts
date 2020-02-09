import { keyframes, style } from '@angular/animations';

export const wobble = [
  style({ transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2 }),
  style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4 }),
  style({ transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6 }),
  style({ transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8 }),
  style({ transform: 'none', offset: 1 })
];

export const rightFade = [
  style({ transform: 'translateX(-20px)', opacity: 0, offset: 0 }),
  style({ transform: 'none', opacity: 1, offset: 1 })
];
export const leftFade = [
  style({ transform: 'translateX(20px)', opacity: 0, offset: 0 }),
  style({ transform: 'none',opacity: 1, offset: 1 })
];
