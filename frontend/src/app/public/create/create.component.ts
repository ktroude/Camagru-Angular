import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";
import { fadeInAnimation } from "./create.animation";

@Component({
  selector: "app-create",
  template: `
    <body>
      <div class="main_container">
        <div class="overlay_container">
          <p class="title">Choose an overlay</p>
          <div class="overlay_arrow_container">
            <img
              src="assets/img/left-arrow.png"
              alt=""
              class="arrow"
              (click)="getPrev()"
            />
            <img
              class="overlay"
              src="{{ getSlide() }}"
              alt="slide"
              id="{{ this.slides[this.i] }}"
            />
            <img
              src="assets/img/right-arrow.png"
              alt=""
              class="arrow"
              (click)="getNext()"
            />
          </div>
        </div>
        <div
          *ngIf="this.camera === true && this.file === false"
          class="camera_container"
        >
          <p class="title_camera">Take a picture</p>
          <video
            *ngIf="this.camera === true"
            class="camera"
            #videoElement
            autoplay
          ></video>
          <div class="confirm_choice" *ngIf="camera === true">
            <img
              class="check"
              src="assets/img/check.png"
              alt="Take a picture"
              (click)="sendImages()"
            />
            <img
              src="assets/img/cross.png"
              alt="Cancel"
              class="check"
              (click)="cancel()"
            />
          </div>
        </div>
        <div
          *ngIf="this.camera === false && this.file === true"
          class="file_container"
        >
          <img
            class="file"
            [src]="this.getImageUrl()"
            alt="user chosen image"
          />
          <div class="confirm_choice" *ngIf="file === true">
            <img
              class="check"
              src="assets/img/check.png"
              alt="Take a picture"
              (click)="sendImages()"
            />
            <img
              src="assets/img/cross.png"
              alt="Cancel"
              class="check"
              (click)="cancel()"
            />
          </div>
        </div>
        <div
          *ngIf="this.camera === false && this.file === false"
          class="choice_container"
        >
          <p class="title">Use your webcam or select a file</p>
          <div class="choice_box">
            <img
              src="assets/img/video.png"
              alt=""
              class="img_choice"
              (click)="chooseWebcam()"
            />
            <label for="file-input" class="custom-file-input-label">
              <img
                class="img_choice"
                src="assets/img/phone.png"
                alt=""
                (click)="openFilePicker()"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="side_container">
        <div *ngIf="this.backendReturn.length > 0">
          <div
            class="result_container"
            *ngFor="let image of this.backendReturn"
            (click)="zoom(image)"
          >
            <img class="result" [src]="image" alt="Image" />
          </div>
        </div>
      </div>
      <div *ngIf="isZoomed === true" class="zoomed">
        <div class="zoomed_container">
          <img class="zoomed_photo" [src]="zoomedImageUrl" alt="Zoomed Image" />
          <textarea
            class="zoomed_input"
            type="text"
            placeholder="Add a description ..."
          ></textarea>
          <button class="zoomed_button" (click)="newPost()">
            Create new post
          </button>
        </div>
      </div>
    </body>
  `,
  styleUrls: ["./create.css"],
  animations: [fadeInAnimation],
})
export class CreateComponent implements OnInit {
  @ViewChild("videoElement") videoElement: ElementRef;

  zoomedImageUrl: string = "";
  isZoomed: boolean = false;
  camera: boolean = false;
  file: boolean = false;
  currentSlide: string;
  slides: string[];
  imageArray: any[] = [];
  i: number;
  animationState: boolean = false;
  selectedImage: File | null;

  backendReturn: any[] = [];

  constructor(private router: Router) {
    this.i = 0;
    this.slides = [
      "assets/img/overlay/1.png",
      "assets/img/overlay/2.png",
      "assets/img/overlay/3.png",
    ];
    this.currentSlide = this.slides[0];
  }

  async ngOnInit() {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/verify/token",
        { withCredentials: true }
      );
      if (response.status !== 200) this.redirect("auth/required");
    } catch (e: any) {
      try {
        if (e.code === "ERR_BAD_REQUEST") {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) {
            this.redirect("auth/required");
          }
        } else this.redirect("auth/required");
      } catch (e) {
        this.redirect("auth/required");
      }
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.animationState = true;
    this.i == 0 ? (this.i = this.slides.length - 1) : this.i--;
    setTimeout(() => {
      this.animationState = false;
    }, 500);
  }

  getNext() {
    this.animationState = true;
    this.i < this.slides.length - 1 ? this.i++ : (this.i = 0);
    setTimeout(() => {
      this.animationState = false;
    }, 500);
  }

  chooseWebcam() {
    this.camera = true;
    this.file = false;
    this.initializeWebcam();
  }

  async initializeWebcam() {
    try {
      this.camera = true;
      this.file = false;
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      this.videoElement.nativeElement.srcObject = stream;
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  }

  async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  async sendImages() {
    const filter = await this.getImageFileFromUrl(this.slides[this.i]);
    const screen = await this.captureWebcamImage();
    if (!filter || !screen) {
      console.error("Erreur lors de la récupération des fichiers.");
      return;
    }
    const formData = new FormData();
    formData.append("files", screen, "userImage.png");
    formData.append("files", filter, "filterImage.png");
    try {
      const response = await axios.post(
        "http://localhost:8080/post/preview",
        formData,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(new Blob([response.data]));
        this.backendReturn.push(imageUrl);
      }
    } catch (e: any) {
      try {
        if (e.code === "ERR_BAD_REQUEST") {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) this.redirect("auth/required");
          else {
            const newResponse = await axios.post(
              "http://localhost:8080/post/preview",
              formData,
              {
                responseType: "blob",
                withCredentials: true,
              }
            );
            const imageUrl = URL.createObjectURL(new Blob([newResponse.data]));
            this.backendReturn.push(imageUrl);
          }
        }
      } catch (e) {
        console.error("Erreur lors de l'envoi des fichiers :", e);
      }
    }
  }

  async getImageFileFromUrl(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const filename = imageUrl.split("/").pop() || "image.png";
    return new File([blob], filename, { type: blob.type });
  }

  async captureWebcamImage(): Promise<File | null> {
    const videoElement = document.querySelector(".camera") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          const filename = "webcam-screenshot.png";
          const file = new File([blob], filename, { type: "image/png" });
          resolve(file);
        } else {
          throw Error("Impossible de capturer l'image de la webcam.");
        }
      }, "image/png");
    });
  }

  stopVideoStream() {
    this.camera = false;
    this.file = true;
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    if (video && video.srcObject) {
      const tracks = (video.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  }

  onFileSelected(event: any) {
    const selectedFile: File = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const headerArray = new Uint8Array(reader.result as ArrayBuffer);
        if (this.isPng(headerArray) || this.isJpeg(headerArray)) {
          this.selectedImage = selectedFile;
          this.camera = false;
          this.file = true;
        } else {
          this.file = false;
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
    console.log(selectedFile);
  }

  openFilePicker() {
    const inputElement: HTMLInputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".jpg, .png";
    inputElement.addEventListener("change", (event: Event) => {
      this.onFileSelected(event);
    });
    inputElement.click();
  }

  getImageUrl(): string | null {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return null;
  }

  cancel() {
    if (this.camera) this.stopVideoStream();
    if (this.selectedImage) this.selectedImage = null;
    this.file = false;
    this.camera = false;
  }

  isPng(headerArray: Uint8Array): boolean {
    return (
      headerArray.length >= 2 && headerArray[0] === 137 && headerArray[1] === 80
    );
  }

  isJpeg(headerArray: Uint8Array): boolean {
    return (
      headerArray.length >= 4 &&
      headerArray[0] === 255 &&
      headerArray[1] === 216 &&
      headerArray[2] === 255 &&
      (headerArray[3] === 224 || headerArray[3] === 225)
    );
  }

  zoom(url: string) {
    this.isZoomed = true;
    this.zoomedImageUrl = url;
  }

  unzoom() {
    this.isZoomed = false;
    this.zoomedImageUrl = "";
  }

  newPost() {}
}
