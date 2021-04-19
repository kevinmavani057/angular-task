import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private service: Service) { }
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  ngOnInit(): void {
  }
  update(user: NgForm){
    this.service.updateUser(user.value).subscribe(res=>{
      console.log(res);
      
    });
  }
}
