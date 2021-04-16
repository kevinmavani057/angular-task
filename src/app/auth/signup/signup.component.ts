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
  usersData: any;

  alertMessage: string = '';
  constructor(private service: ServiceService, private router: Router, private http: HttpClientModule) { }
  ngOnInit(): void {
    if (this.service.isloggedIn()) {
      this.router.navigate(['user']);
    }
  }
  @ViewChild('userData')
  signupForm!: NgForm;
  register(userData: NgForm) {

    this.invalidRegister1 = false;
    this.invalidRegister2 = false;
    this.invalidRegister = false;
    if (this.signupForm.valid === false) {
      this.invalidRegister = true;
      this.errorMessage = '* Please fill all the fields!';
    } else {

      this.service.createUser(userData.value).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(['auth/login'], { queryParams: { registered: 'true' } });

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



