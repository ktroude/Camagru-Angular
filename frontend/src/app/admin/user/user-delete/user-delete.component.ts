import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  template: `
    <p>
      user-delete works!
    </p>
  `,
  styles: [
  ]
})
export class UserDeleteComponent {

  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void{
    this.activated.params.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
