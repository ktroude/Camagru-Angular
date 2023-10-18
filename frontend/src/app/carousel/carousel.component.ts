import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  src:string,
  alt:string
}

@Component({
  selector: 'app-carousel',
  template: `
  <div *ngIf="images && images.length" class="carousel_container">
    <img *ngFor="let image of images; let i = index" [src]="image.src" [alt]="image.alt" [ngClass]="{'image-active': selectedIndex === i}">

  </div>
  `,
  styles: [
  ]
})
export class CarouselComponent implements OnInit {

  @Input() images: carouselImage[] = []

  selectedIndex:number = 0;

  ngOnInit(): void {
      
  }
}
