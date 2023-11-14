import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification">
      <img src="assets/img/bell.png" alt="">
    <p>
      Hey there, {{who}} have just {{message.toLowerCase()}} your post
    </p>
    <p>Come see and react by cliking here</p>
    </div>
  `,
  styleUrls: ['./notification.css'],
})
export class NotificationComponent {
  @Input() message: string;
  @Input() who: string;
}