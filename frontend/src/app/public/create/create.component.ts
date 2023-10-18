import { Component } from '@angular/core';


@Component({
  selector: 'app-create',
  template: `
          <body>

          <div class="overlay_container">
            <h3>Choose an overlay</h3>
            <img  class="prev_button" src="assets/img/image (1).png" alt="button up"(click)="getPrev()" >
            <img class="slide" src="{{ getSlide() }}" alt="slide" [class.fade-in]="shouldFadeIn" />
            <img  class="next_button" src="assets/img/image.png" alt="button down" (click)="getNext()" >
          </div>



          <div class="camera_container">
            <h3>Use your webcam or select a file</h3>
            <div class="change_mode">
              <div class="text">Select a file</div>
              <img  class="change" *ngIf="this.file === true" src="assets/img/video.png" alt="">
              <img  class="change" *ngIf="this.camera === true" src="assets/img/phone.png" alt="">
            </div>
            <div *ngIf="this.camera === false && this.file === false" class="chose_mode_container">
              <img class='icon' src="assets/img/video.png" alt="" (click)="chooseWebcam()">
              <img class='icon' src="assets/img/phone.png" alt="" (click)="chooseFile()">
            </div>
            <div *ngIf="this.camera === true" class="camera"></div>
            <div *ngIf="this.camera === true || this.file === true" class="confirmation">
              <img class="next_button" src="assets/img/check.png" alt="">
              <div class="text">Validate my choices</div>
            </div>
          </div>



          <div class="registered_container">
            <h3>Post your favorite picture</h3>
          </div>

          </body>
  `,
  styleUrls: [
    "./create.css"
  ]
})
export class CreateComponent {


  camera:boolean = false;
  file:boolean = false;
    slides: string[];
    i: number;
    shouldFadeIn: boolean = false;


  constructor() {
    this.i = 0;
    this.slides = [
      'https://ep01.epimg.net/elcomidista/imagenes/2022/10/31/articulo/1667206537_604382_1667230832_noticia_normal.jpg',
      'https://storage.googleapis.com/css-photos/menu-photos/1d2d5a63-1603-473b-9464-e8fa6787f40b.jpeg',
      'https://ep01.epimg.net/elcomidista/imagenes/2022/01/11/receta/1641893642_902475_1641893828_noticia_normal.jpg',
    ];
  }
  getSlide() {
    this.shouldFadeIn = true;
    setTimeout(() => {
      this.shouldFadeIn = false;
    }, 800);
    return this.slides[this.i];
  }

  getPrev() {
    this.i == 0 ? (this.i = this.slides.length - 1) : this.i--;
  }

  getNext() {
    this.i < this.slides.length - 1 ? this.i++ : (this.i = 0);
  }

  chooseWebcam() {
    this.camera = true;
  }

  chooseFile() {
    this.file = true;
  }
}
