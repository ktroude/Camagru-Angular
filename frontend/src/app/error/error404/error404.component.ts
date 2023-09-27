import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
      <div class="container">
        <img src="assets/img/404.jpg" alt="logo">
      </div>
  `,
  styles: [
    `
      .container{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          width:100vw;
          height: 100vh;
      }

      img{
        max-width: 90%;
        max-height: 90%;
        height: auto;
      }
    `
  ]
})
export class Error404Component {

}
