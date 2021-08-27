import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Dezurstvo } from '../model/dezurstvo.model';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  nastavnik: Korisnik;
  korisnickoIme: string
  dezurstvo: Dezurstvo;

  dezurstva: Dezurstvo[];

  ngOnInit(): void {

    this.dezurstvo = JSON.parse(localStorage.getItem('dezurstvo'));
    this.korisnickoIme = this.dezurstvo.nastavnik;
    this.dezurstva = JSON.parse(localStorage.getItem('dezurstva'));

    this.userService.getNastavnikName(this.korisnickoIme).subscribe((nast: Korisnik) => {
      if(nast){
        this.nastavnik = nast;
        console.log(this.nastavnik);
      }
      else{
        alert("Ne mogu se dovuci nastavnik");
      }
  });

  }

  posaljiZahtev(zamenskoDezurstvo){
    console.log(this.dezurstvo);
    console.log(zamenskoDezurstvo);

    this.userService.addZamena(this.dezurstvo.id, zamenskoDezurstvo.id).subscribe((res: any) => {
      if(res.status == 200){
        console.log(res);
      }
      else{
        alert("Ne mogu dodati zahtev");
      }
  });

  }

  back(){
    this.router.navigate(['/nastavnik']);
  }

}
