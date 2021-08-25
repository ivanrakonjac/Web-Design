import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  poruka: string;

  ngOnInit(): void {
  }

  login(){

    this.userService.login(this.username,this.password).subscribe((user: User)=>{
        if(user){

          console.log(user);

          let datum = new Date(user.datumRodjenja);

          let danas = new Date();

          // console.log((danas.getFullYear() - datum.getFullYear()) );

          if((danas.getFullYear() - datum.getFullYear()) > 18){

            if(user.jeInspektor){
              alert('inspektor');
              this.router.navigate(['/inspektor']);
            }else{
              alert('Kandidat');
              this.router.navigate(['/kandidat']);
            }

            localStorage.setItem('username', user.username);
            localStorage.setItem('ime', user.ime);
            localStorage.setItem('prezime', user.prezime);
            localStorage.setItem('datumRodjenja', user.datumRodjenja + "");
            localStorage.setItem('jeInspektor', user.jeInspektor + "");

          }else{
            this.poruka = "Maloletan si!"
          }

          

        }else{
          this.poruka = "Gde ces!";
        }
    })
  }

}
