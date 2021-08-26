import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesto } from 'src/model/mesto.model';
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
  mesta: Mesto[];
  mesto: string;

  izabranoMesto: number;
  tipPrijave: string = '';

  polozilaTeoriju: boolean = false;
  polozilaVoznju: boolean = false;;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ime = localStorage.getItem('ime');
    this.prezime = localStorage.getItem('prezime');
    this.datumRodjenja = localStorage.getItem('datumRodjenja');
    this.mesto = localStorage.getItem('mesto');

    this.userService.prijavaZaUsername(this.username).subscribe((prijave: Prijava[])=>{

      if(prijave){
        this.prijave = prijave;

        this.prijave.forEach(prijava => {

          console.log(prijava.status==1 && prijava.vrsta=='t');
          console.log(prijava.status==1 && prijava.vrsta=='v');

          if(prijava.status==1 && prijava.vrsta=='t'){
            this.polozilaTeoriju = true;
            console.log("Evo me");
          }
          
          if(prijava.status==1 && prijava.vrsta=='v'){
            this.polozilaVoznju = true;
            console.log("Evo me2");
          }

          console.log(prijava);
          this.userService.polaganjeZaIdPrijave(prijava.idPrijava).subscribe((polaganje: Polaganje)=>{
            polaganje.vrsta = prijava.vrsta;
            polaganje.mesto = prijava.mesto;
            this.polaganja.push(polaganje);
          })
        });

      }

    });

    this.userService.getSvaMesta().subscribe((mesta: Mesto[])=>{

      if(mesta){
        this.mesta = mesta;
        console.log(mesta);
      }

    });
  
  }

  prijava(){
    console.log(this.tipPrijave);
    console.log(this.mesto);

    const data = {
      "vrsta": this.tipPrijave,
      "mesto": this.mesto,
      "username": this.username,
      "status": 0
    }

    this.userService.dodajPrijavu(data).subscribe((prijava: Prijava)=>{

      if(prijava){
        console.log(prijava);
      }

    });
  }

 

  logout(){
    this.userService.logout();
  }

}
