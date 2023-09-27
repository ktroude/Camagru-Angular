import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PublicHeaderComponent } from './public-header/public-header.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    PublicLayoutComponent,
    PublicHeaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
