import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Polaganje } from 'src/model/polaganje.model';
import { Prijava } from 'src/model/prijava.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-kandidat',
  templateUrl: './kandidat.component.html',
  styleUrls: ['./kandidat.component.css']
})
export class KandidatComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username:string;
  ime: string;
  prezime: string;
  datumRodjenja: string;
  prijave: Prijava[];
  polaganja: Polaganje[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ime = localStorage.getItem('ime');
    this.prezime = localStorage.getItem('prezime');
    this.datumRodjenja = localStorage.getItem('datumRodjenja');

    this.userService.prijavaZaUsername(this.username).subscribe((prijave: Prijava[])=>{

      if(prijave){
        this.prijave = prijave;

        this.prijave.forEach(prijava => {
          console.log(prijava);
          this.userService.polaganjeZaIdPrijave(prijava.idPrijava).subscribe((polaganje: Polaganje)=>{
            polaganje.vrsta = prijava.vrsta;
            this.polaganja.push(polaganje);
          })
        });

      }

      console.log(this.polaganja);
      

    });

    
  }

 

  logout(){
    this.userService.logout();
  }

}
