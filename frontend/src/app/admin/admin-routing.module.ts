import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
      path: '', component:AdminLayoutComponent, children:[
          {path: '', redirectTo:'dashboard', pathMatch:'full'},
          {path: 'dashboard', component:DashboardComponent},
          {path:'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule)},
          {path:'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule)}
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
