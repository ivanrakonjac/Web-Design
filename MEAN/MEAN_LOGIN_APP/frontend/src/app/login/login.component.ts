import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServise: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  login(){
    this.userServise.login(this.username, this.password).subscribe((user: User)=>{

      console.log(this.username);
      console.log(this.password);
      console.log(user);

      if(user){
        localStorage.setItem('user', user.username);
        if(user.type==0) this.ruter.navigate(['/user']);
        else this.ruter.navigate(['/admin']);
      }
      else{
        alert("Bad data");
      }
    })
  }

}
