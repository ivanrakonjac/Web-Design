import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Dezurstvo } from '../model/dezurstvo.model';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  korisnickoIme: string;
  dezurstva: Dezurstvo[];
  nastavnici: Korisnik[];

  nastavnikPretraga: string;
  dezurstvaPretraga: Dezurstvo[];

  ngOnInit(): void {

    this.korisnickoIme = localStorage.getItem('korisnickoIme');

    this.userService.getDezurstva(this.korisnickoIme).subscribe((dez: Dezurstvo[]) => {
        if(dez){
          this.dezurstva = dez.sort((a, b) => {
              let date1 = new Date(a.datumVreme);
              let date2 = new Date(b.datumVreme);

              return date1.getDate() - date2.getDate();
          });
          // console.log(this.dezurstva);
        }
        else{
          alert("Ne mogu se dovuci dezurstva");
        }
    });

    this.userService.getAllNastavnikNames().subscribe((nast: Korisnik[]) => {
      if(nast){
        this.nastavnici = nast;
        // console.log(this.nastavnici);
      }
      else{
        alert("Ne mogu se dovuci nastavnik");
      }
  });
  }

  getDezurstva(){
    // console.log(this.nastavnikPretraga);

    this.userService.getDezurstva(this.nastavnikPretraga).subscribe((dez: Dezurstvo[]) => {
      if(dez){
        this.dezurstvaPretraga = dez.sort((a, b) => {
            let date1 = new Date(a.datumVreme);
            let date2 = new Date(b.datumVreme);

            return date1.getDate() - date2.getDate();
        });
        // console.log(this.dezurstvaPretraga);
      }
      else{
        alert("Ne mogu se dovuci dezurstva");
      }
  });
  }

  nastavnikHasDezurstvo(id){
    return this.dezurstva.find(element => element.id == id ? true : false);
  }

  zamena(dezurstvo){

    console.log(dezurstvo);

    localStorage.setItem('dezurstvo', JSON.stringify(dezurstvo));
    localStorage.setItem('dezurstva', JSON.stringify(this.dezurstva));

    this.router.navigate(['/detalji']);

  }

  zamene(){
    this.router.navigate(['/zamene']);
  }

  logout(){
    this.userService.logout();
  }
}
