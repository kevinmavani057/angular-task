// import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';



const routes: Routes = [
 
  {
    path: 'auth/register',
    component: SignupComponent
  },
  {
    path: 'auth/login',
    component: SigninComponent
  },
  {
    path: '',
    redirectTo:'/auth/register',
    pathMatch: 'full'
  }
  // {
  //   path: 'user/user-listing',
  //   component: UserListingComponent
  // },
  // {
  //   path: 'admin/admin-listing',
  //   component: AdminListingComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
