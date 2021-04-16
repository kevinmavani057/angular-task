import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: ServiceService) { }
  infoMessage = '';
  users: any;
  errorMessage: string | undefined;
  invalidLogIn: boolean | undefined;

  ngOnInit() {
    if (this.service.isloggedIn()) {
      this.router.navigate([`${this.service.userType}`]);
    }
    this.route.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Registration Successful! Please Login!';
        }
      });

  }
  login(user: NgForm) {

    this.service.createUser1(user.value).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', encryptToken(res.token));
      localStorage.setItem('firstName', res.user.firstName);
      localStorage.setItem('lastName', res.user.lastName);
      localStorage.setItem('email', res.user.email);
      this.service.userType = res.user.userType
      this.router.navigate([`${this.service.userType}`]);

    }, (err: any) => {
      if (err.error.status == 401) {
        this.invalidLogIn = true;

        this.errorMessage = '* Incorrect email or password';
      }
    }
    )
  }
}
function encryptToken(token: string): string {
  const secretKey = '123456789'
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(token), secretKey).toString();
  } catch (e) {
    console.log(e);
    return e;
  }

}

