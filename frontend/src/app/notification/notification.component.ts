import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 70px;
      right: 20px;
      height: 100px;
      width: 200px;
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  `],
})
export class NotificationComponent {
  @Input() message: string;
}