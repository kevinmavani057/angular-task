import { Component } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-project';
  constructor(private service: Service){}
  isLoggedIn: boolean = this.service.isloggedIn();
  
}
