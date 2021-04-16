import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
  constructor(private service: ServiceService, private router: Router){

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
