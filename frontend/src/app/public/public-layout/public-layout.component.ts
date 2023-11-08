import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  template: `
    <app-public-header></app-public-header>
    <router-outlet></router-outlet>
    `,
  styles: []
})
export class PublicLayoutComponent {
  
  constructor(private router: Router) { }

  redirect(path:string) {
    this.router.navigate([path]);
  }
}
