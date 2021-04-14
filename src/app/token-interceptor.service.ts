import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

 
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector, private service: ServiceService) { } 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // let service = this.injector.get(ServiceService);
    // console.log(this.service.getToken());
    let tokenReq= req.clone({
      headers: req.headers.set('token',`${this.service.getToken()}`)  
      
    })
    return next.handle(tokenReq)
  }
}
