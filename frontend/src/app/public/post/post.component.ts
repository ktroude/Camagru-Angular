import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  template: `
    <p>
      post works!
      id = {{postId}}
    </p>
  `,
  styles: [
  ]
})
export class PostComponent {
  postId: string|null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.postId = params.get('id');
    });
  }
}
