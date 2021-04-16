import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminListingComponent } from './admin-listing/admin-listing.component';
import { AdminComponent } from './admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[ AuthguardGuard],
    children: [{
      path: 'admin-profile',
      component: AdminDashboardComponent
    },
    {
      path: 'admin-listing',
      component: AdminListingComponent,
      children: [{path: 'edit/:id',
      component: EditUserComponent}]
    },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
