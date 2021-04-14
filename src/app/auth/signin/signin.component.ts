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
  // email: string | number = '';
  // password: string | number = '';
  infoMessage = '';
  users: any;
  // userType: string = '';
  errorMessage: string | undefined;
  invalidLogIn: boolean | undefined;
  // userName: string='';
  // @ViewChild('user')
  // signInForm!: NgForm;

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
    // console.log(user.value.userType);  

    this.service.createUser1(user.value).subscribe((res: any) => {
      // this.invalidLogIn = false;
      console.log(res);
      // if (res.status === 401) {
      //   console.log('* Incorrect email or password');
      //   this.invalidLogIn = true;
      //   this.errorMessage = '* Incorrect email or password';
      // } else {
      // localStorage.setItem('token1', res.token);

      localStorage.setItem('token', encryptToken(res.token));
      localStorage.setItem('firstName',res.user.firstName);
      localStorage.setItem('lastName',res.user.lastName);
      localStorage.setItem('email',res.user.email);
      // this.service.isloggedIn = false;
      // this.service.hideNav = false;

      // this.service.firstName = res.user.firstName;
      // this.service.lastName = res.user.lastName;
      // this.service.email = res.user.email;
      this.service.userType = res.user.userType
      this.router.navigate([`${this.service.userType}`]);
      // }
    }, (err: any) => {
      // console.log(err.error.status);
      if(err.error.status==401){
      this.invalidLogIn = true;

      this.errorMessage = '* Incorrect email or password';}
    }
    )
    // console.log(user.value.email);
    // this.errorMessage='';
    // this.service.getUserDetail().subscribe((res: any) => {
    //   this.users = res;
    //   for (let data of this.users) {
    //     if ((user.value.email == data.email) && (user.value.password == data.password)) {
    //       this.userType = data.userType;
    //       // console.log(this.userType);
    //       this.router.navigate([`${this.userType}`]);
    //       this.service.isloggedIn=false;
    //       this.service.userName = data.firstName;

    //       break;
    // }else if(user.value.email !== data.email){
    //   this.errorMessage = '* You are not registered please register'
    //   }
    //   else {
    //     // console.error('Please enter valid credential');
    //     this.errorMessage = '* Please enter valid credential';
    //   }
    // }
    // })
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

