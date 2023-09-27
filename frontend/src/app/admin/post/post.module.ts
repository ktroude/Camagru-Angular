import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';


@NgModule({
  declarations: [
    PostIndexComponent,
    PostEditComponent,
    PostAddComponent,
    PostDeleteComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
