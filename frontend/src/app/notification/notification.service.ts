import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notif = new Subject<string>();

  getNotification() {
    return this.notif.asObservable();
  }

  showNotification(message: string) {
    this.notif.next(message);
  }
}