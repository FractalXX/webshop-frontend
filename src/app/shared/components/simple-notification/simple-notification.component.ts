import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-simple-notification',
  template: ` <div [innerHTML]="content"></div> `,
})
export class SimpleNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public content: string) {}
}
