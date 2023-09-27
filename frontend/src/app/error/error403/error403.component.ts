import { Component } from '@angular/core';

@Component({
  selector: 'app-error403',
  template: `
      <div class="container">
        <img src="assets/img/403.jpg" alt="logo">
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
        width: 90vw;
        max-width: 100%;
        max-height: 100%;
        height: auto;
      }
    `
  ]
})
export class Error403Component {

}
