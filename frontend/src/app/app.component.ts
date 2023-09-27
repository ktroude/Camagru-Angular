import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: [
  `
    body{
      margin: 0px;
      padding: 0px;
    }
  `,
  ]
})
export class AppComponent {
  title:string = 'frontend';
}
