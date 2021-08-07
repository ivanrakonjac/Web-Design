import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})

export class KupacComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.dohvatiSveKnjige().subscribe((knjige: Knjiga[])=>{
      this.sveKnjige = knjige;
    })
  }

  sveKnjige: Knjiga[];

  kupi(knjiga: Knjiga){
    localStorage.setItem('knjiga', JSON.stringify(knjiga));
    this.router.navigate(['infoKnjiga']);
  }

}
