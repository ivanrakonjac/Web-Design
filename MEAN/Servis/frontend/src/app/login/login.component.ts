import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  kor_ime: string;
  lozinka: string;
  radnik: boolean;
  radnikTip: string;
  greska: string = '';


  ngOnInit(): void {
  }

  login(){
    console.log(this.kor_ime);
    console.log(this.lozinka);
    console.log(this.radnik);
    console.log(this.greska);

    if(this.radnik){
      this.radnikTip = 'radnik';
    }else{
      this.radnikTip = 'serviser';
    }

    const data = {
      "kor_ime": this.kor_ime,
      "lozinka": this.lozinka,
      "tip": this.radnikTip
    }

    this.userService.login(data).subscribe((user: User)=>{
      if(user){

        // console.log(user);

        localStorage.setItem('user', JSON.stringify(user));

        if(user.tip == 'serviser'){
          this.router.navigate(['serviser']);
        }else{
          this.router.navigate(['radnik']);
        }
      }else{
        this.greska = 'Gde ces?';
      }
    });
  }

}
