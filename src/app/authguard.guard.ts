import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
  constructor(private service: Service, private router: Router){

  }
  canActivate(): boolean {
    if(this.service.isloggedIn()){
      return true;
    }else{
      this.router.navigate(['auth/login']);
      return false;
    }
    
  }
    
}
