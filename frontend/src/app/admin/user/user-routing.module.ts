import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

const routes: Routes = [
  {path: '', component:UserIndexComponent},
  {path:'edit/:id', component:UserEditComponent},
  {path:'add', component:UserAddComponent}, 
  {path:'delete/:id', component:UserDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
