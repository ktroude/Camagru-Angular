import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  template: `
    <p>
      post-edit works!
    </p>
  `,
  styles: [
  ]
})
export class PostEditComponent {
  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void{
    this.activated.params.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
