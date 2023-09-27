import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  template: `
    <p>
      user-edit works!
    </p>
  `,
  styles: [
  ]
})
export class UserEditComponent {

    constructor(private activated: ActivatedRoute){}

  ngOnInit(): void{
    this.activated.params.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}
