import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  notify(
    text: string,
    type: NotificationType = NotificationType.SUCCESS,
    duration = 3000,
  ): void {
    this.snackBar.open(text, null, {
      duration,
      panelClass: type,
    });
  }
}
