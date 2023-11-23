import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';

const routes: Routes = [
  {path: '', component:PostIndexComponent},
  {path: 'index', component:PostIndexComponent},
  {path:'edit/:id', component:PostEditComponent},
  {path:'add', component:PostAddComponent}, 
  {path:'delete/:id', component:PostDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
