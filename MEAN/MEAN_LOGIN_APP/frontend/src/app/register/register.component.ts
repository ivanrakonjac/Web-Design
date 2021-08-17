import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servis: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  mail: string;
  type: string;

  register(){
    this.servis.register(this.username, this.password, this.mail, this.type).subscribe(ob=>{
        
      if(ob['user']=='ok'){
        alert('User added')
      }

    })
  }

}
