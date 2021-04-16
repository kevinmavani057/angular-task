import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {MatRadioModule} from '@angular/material/radio';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    SharedmoduleModule,
    MatRadioModule
  ]
})
export class AuthModule { }
