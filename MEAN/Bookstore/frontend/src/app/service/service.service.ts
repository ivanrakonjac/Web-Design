import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // Adresa gde je nas backend
  uri = 'http://localhost:4001';


  constructor(private http: HttpClient) { }

  dohvatiSveKnjige(){
    return this.http.get(`${this.uri}/dohvatiSveKnjige`);
  }

  naruci(idK, kolicina){

    const data = {
      idK: idK,
      kolicina: kolicina
    }

    return this.http.post(`${this.uri}/naruci`, data);
  }

  getSveNarudzbine(){
    return this.http.get(`${this.uri}/dohvatiSveNarudzbine`);
  }

  dohvatiKnjigu(idK){
    const data={
      idK:idK
    }
    return this.http.post(`${this.uri}/dohvatiKnjigu`, data);
  }
}
