import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username:string;
  password:string;
  badData: string = '';

  ngOnInit(): void {
  }

  login(){
    console.log(this.username);
    console.log(this.password);

    this.userService.login(this.username, this.password).subscribe((korisnik: Korisnik) => {
        if(korisnik){

          localStorage.setItem('korisnickoIme', this.username);

          this.router.navigate(['/nastavnik']);
        }else{
          this.badData = 'Bad data!';
        }
    });
  }

}
