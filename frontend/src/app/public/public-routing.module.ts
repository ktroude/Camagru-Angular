import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { ProfileOtherComponent } from './profile-other/profile-other.component';

const routes: Routes = [

  {path: '', component: PublicLayoutComponent, children: [    
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: "home", component:HomeComponent},
    {path: "profile", component:ProfileComponent},
    {path: 'profile/:id', component:ProfileOtherComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { 

}
