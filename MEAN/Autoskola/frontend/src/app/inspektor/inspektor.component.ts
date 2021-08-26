import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prijava } from 'src/model/prijava.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inspektor',
  templateUrl: './inspektor.component.html',
  styleUrls: ['./inspektor.component.css']
})
export class InspektorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  brPoena:string;
  datum:string;
  status:string;
  vrstaPrijave: string;
  
  username:string;
  ime: string;
  prezime: string;
  datumRodjenja: string;
  mesto: string;

  prijave: Prijava[];

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ime = localStorage.getItem('ime');
    this.prezime = localStorage.getItem('prezime');
    this.datumRodjenja = localStorage.getItem('datumRodjenja');
    this.mesto = localStorage.getItem('mesto');

    this.userService.getPolaganjeZaGradSaStatusom0(this.mesto).subscribe((prijave: Prijava[])=>{

      if(prijave){
        this.prijave = prijave;
        console.log(this.prijave);
      }

    });

  }

  logout(){
    this.userService.logout();
  }

  unesiRez(prijava){
    console.log(prijava);
    this.vrstaPrijave = prijava.vrsta;
    document.getElementById('forma').style.visibility = "visible";
  }

  potvrdi(){
    console.log(this.brPoena);
    console.log(this.datum);
    console.log(this.status);
  }

}
