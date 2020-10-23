import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const tableRowExpand = trigger('expandRow', [
  state('collapsed', style({ height: '0', minHeight: '0' })),
  state('expanded', style({ height: AUTO_STYLE })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
  ),
]);
