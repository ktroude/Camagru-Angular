import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PostComponent } from './post/post.component';
import { NotificationComponent } from '../notification/notification.component';
import { MyPostComponent } from './my-post/my-post.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    PublicLayoutComponent,
    PublicHeaderComponent,
    FooterComponent,
    CreateComponent,
    PostComponent,
    NotificationComponent,
    MyPostComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    CarouselModule.forRoot(),
  ]
})
export class PublicModule { }
