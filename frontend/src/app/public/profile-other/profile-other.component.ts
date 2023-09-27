import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-other',
  template: `
    <p>
      profile-other works!
    </p>
  `,
  styles: [
  ]
})
export class ProfileOtherComponent {

  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void{
    this.activated.params.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
