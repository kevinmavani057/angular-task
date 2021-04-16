import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './user-listing/user-listing.component';
import { MatTableModule } from '@angular/material/table';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [UserListingComponent, UserDashboardComponent, UserComponent],
  imports: [
    CommonModule,
    MatTableModule,
    UserRoutingModule,
    SharedmoduleModule
  ],
  
})
export class UserModule { }
