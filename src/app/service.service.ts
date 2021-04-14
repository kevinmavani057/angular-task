import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  // isloggedIn:boolean=true;
  visible: boolean;
  // firstName: string | undefined;
  // lastName: string = '';
  // email: string = '';
  userType: string = '';
  // hideNav: boolean=true;
  // islogIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { this.visible = true }
  url = 'http://localhost:8000';
  createUser(user: any) {
    return this.http.post(`${this.url}/users`, user);
  }
  createUser1(user: any) {
    return this.http.post(`${this.url}/auth/login`, user);
  }
  getUserDetail() {
    return this.http.get(`${this.url}/users`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
  updateUser(user: any){
    return this.http.put(`${this.url}/profile`, user);
  }
  getFirstName() {
    return localStorage.getItem('firstName');
  }
  getLastName() {
    return localStorage.getItem('lastName');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  isloggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
