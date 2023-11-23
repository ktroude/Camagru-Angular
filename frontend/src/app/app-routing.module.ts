import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error/error404/error404.component';
import { Error403Component } from './error/error403/error403.component';
import { adminGuard } from './utils/admin.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(module => module.PublicModule)},
  { path:'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule),
     canActivate: [adminGuard]
  },
  { path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'error_403', component: Error403Component},
  { path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
