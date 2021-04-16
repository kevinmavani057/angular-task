import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private service: ServiceService) { }
  firstName: string = '';
  lastName: string = '';
  password: string | number = '';
  cPassword: string | number = '';
  email: string = '';

  ngOnInit(): void {
  }
  update(user: NgForm){
    this.service.updateUser(user.value).subscribe(res=>{
      console.log(res);
      
    });
  }
}
