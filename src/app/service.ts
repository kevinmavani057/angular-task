import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class Service {
  visible: boolean;
  userType: string = '';
  showUserProfile:boolean = false;
  constructor(private http: HttpClient) { this.visible = true }
  url = 'http://localhost:8000';
  createUser(user: any) {
    return this.http.post(`${this.url}/users`, user);
  }
  login(user: any) {
    return this.http.post(`${this.url}/auth/login`, user);
  }
  getUserDetail() {
    return this.http.get(`${this.url}/users`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
  updateUser(user: any) {
    return this.http.put(`${this.url}/user/edit`, user);
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
  
  encryptToken(token: string): string {
    const secretKey = '123456789'
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(token), secretKey).toString();
    } catch (e) {
      console.log(e);
      return e;
    }
  
  }
}
