import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../model/knjiga';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-info-knjiga',
  templateUrl: './info-knjiga.component.html',
  styleUrls: ['./info-knjiga.component.css']
})
export class InfoKnjigaComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem('knjiga'));
  }

  knjiga: Knjiga;
  kolicina: string;
  poruka: string;

  naruci(){
    this.service.naruci(this.knjiga.idK,  this.kolicina).subscribe((resp)=>{
      if(resp['poruka']=="OK"){
        this.poruka='OK';
      }
      else{
        this.poruka = 'Greska pri narucivanju';
      }
    })
  }

}
