import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../model/knjiga';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})

export class KupacComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.dohvatiSveKnjige().subscribe((knjige: Knjiga[])=>{
      this.sveKnjige = knjige;
    })
  }

  sveKnjige: Knjiga[];

}
