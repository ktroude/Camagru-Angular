import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';


@NgModule({
  declarations: [
    UserIndexComponent,
    UserEditComponent,
    UserAddComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
