import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Dezurstvo } from '../model/dezurstvo.model';
import { Korisnik } from '../model/korisnik.model';
import { Zamena } from '../model/zamena.model';

@Component({
  selector: 'app-zamena',
  templateUrl: './zamena.component.html',
  styleUrls: ['./zamena.component.css']
})
export class ZamenaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  nastavnik: Korisnik;
  korisnickoIme: string

  dezurstva: Dezurstvo[];
  zamene: Zamena[];

  ngOnInit(): void {

    this.korisnickoIme = localStorage.getItem('korisnickoIme');

    this.userService.getDezurstva(this.korisnickoIme).subscribe((dez: Dezurstvo[]) => {
        if(dez){
          this.dezurstva = dez.sort((a, b) => {
              let date1 = new Date(a.datumVreme);
              let date2 = new Date(b.datumVreme);

              return date1.getDate() - date2.getDate();
          });
        }
        else{
          alert("Ne mogu se dovuci dezurstva");
        }
    });

    this.userService.getAllZamene().subscribe((zamene: Zamena[]) => {
      if(zamene){

        zamene.forEach(elemet => {
          if(this.dezurstva.find( dezurstvo => dezurstvo.id == elemet.dezurstvoMoje ? true : false)){
            this.zamene.push(elemet);
          }
        });

        this.zamene =zamene;
      }
      else{
        alert("Ne mogu se dovuci zamene");
      }
  });

  }

}
