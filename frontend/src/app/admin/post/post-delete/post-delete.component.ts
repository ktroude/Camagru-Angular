import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-delete',
  template: `
    <p>
      post-delete works!
    </p>
  `,
  styles: [
  ]
})
export class PostDeleteComponent {

  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void{
    this.activated.params.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
