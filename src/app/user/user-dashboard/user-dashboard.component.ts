import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private service: Service, private router: Router) { }
  firstName = this.service.getFirstName();
  lastName = this.service.getLastName();
  email = this.service.getEmail();

  ngOnInit(): void {}
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');

    this.router.navigate(['auth/login']);
  }
  
}
