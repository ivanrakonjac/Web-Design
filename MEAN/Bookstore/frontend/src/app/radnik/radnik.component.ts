import { Component, OnInit } from '@angular/core';
import { Narudzbina } from '../model/narudzbina';
import { Narudzbine } from '../model/narudzbine';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getSveNarudzbine().subscribe((sveNarudzbine: Narudzbine)=>{
      this.narudzbine = sveNarudzbine[0].narudzbine;
      // this.narudzbine.narudzbine.forEach((narudzbina: Narudzbina)=>{
      //   this.service.dohvatiKnjigu(narudzbina.knjiga).subscribe((knjiga)=>{
      //     narudzbina.naziv=knjiga['naslov'];
      //   })
      // })
    })
  }

  narudzbine: Array<Object>;

}
