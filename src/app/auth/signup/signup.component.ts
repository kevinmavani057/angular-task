import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  invalidRegister1: boolean | undefined;
  invalidRegister2: boolean | undefined;
  invalidRegister: boolean | undefined;


  errorMessage = '';
  firstName: string = '';
  lastName: string = '';
  password: string | number = '';
  cPassword: string | number = '';
  email: string = '';
  hide1 = true;
  hide2 = true;
  // flag: boolean | undefined;
  usersData: any;

  alertMessage: string = '';
  // router: any;
  constructor(private service: ServiceService, private router: Router, private http: HttpClientModule) { }
  ngOnInit(): void {
    if (this.service.isloggedIn()) {
      // console.log(this.service.userType)
      // this.router.navigate([`${this.service.userType}`]);
      this.router.navigate(['user']);
    }
  }
  @ViewChild('userData')
  signupForm!: NgForm;
  register(userData: NgForm) {
    // console.log(userData.value);
    // console.log(this.email);
    // console.log(this.password);  
    // e.preventDefault();
    this.invalidRegister1 = false;
    this.invalidRegister2 = false;
    this.invalidRegister = false;
    if (this.signupForm.valid === false) {
      this.invalidRegister = true;
      this.errorMessage = '* Please fill all the fields!';
    } else {

      this.service.createUser(userData.value).subscribe((res: any) => {
        console.log(res)
        // alert(this.status);
        // if (res.status == 402) {
        //   // console.log("dhjdhjkhd")
        //   this.invalidRegister1 = true;
        //   console.error('The passwords don\'t match');
        //   this.alertMessage = '* The passwords don\'t match';
        // } else if (res.status == 400) {
        //   this.invalidRegister2 = true;
        //   console.warn('Email is already exist!, please use another mail or login into existing account')
        //   this.alertMessage = '* Email is already exist!, please use another mail or login into existing account';
        // } else {
        // this.service.userType = res.userType;
        // console.log(this.service.userType);
        this.router.navigate(['auth/login'], { queryParams: { registered: 'true' } });

        // }

      }, (err: any) => {
        if (err.error.status == 402) {
          this.invalidRegister1 = true;
          console.error('The passwords don\'t match');
          this.alertMessage = '* The passwords don\'t match';
        } else if (err.error.status == 400) {
          this.invalidRegister2 = true;
          console.warn('Email is already exist!, please use another mail or login into existing account')
          this.alertMessage = '* Email is already exist!, please use another mail or login into existing account';
        }
      })

    }
  }
}


    //   this.invalidRegister = false;
    //   this.flag = true;
    //   if (this.signupForm.valid === false) {
    //     this.invalidRegister = true;
    //     this.errorMessage = '* Please fill all the fields!';
    //   } else if (this.password !== this.cPassword) {
    //     this.invalidRegister = true;
    //     this.errorMessage = '* The passwords do not match!';
    //   }
    //   else {

    //     this.service.getUserDetail().subscribe(res => {
    //       this.usersData = res;
    //       console.log(this.usersData);
    //       for (let data of this.usersData) {

    //         if (this.email === data.email) {
    //           // console.warn(this.email);
    //           // console.log(data.email);
    //           this.flag = false;
    //           break;
    //         }
    //       }
    //       if (this.flag) {
    //         this.service.createUser(userData.value).subscribe(() => { })
    //         this.router.navigate(['auth/login'], { queryParams: { registered: 'true' } });
    //       } else {
    //         this.alertMessage = "* You are already Registered!, please login into existing account or use another mail.";
    //       }
    //     })

    //   }


