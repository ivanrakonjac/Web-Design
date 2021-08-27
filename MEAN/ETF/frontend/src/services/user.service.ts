import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  uri = 'http://localhost:4000';

  login(korisnickoIme, lozinka){

    const data = {
      "korisnickoIme": korisnickoIme,
      "lozinka": lozinka
    }

    return this.http.post(`${this.uri}/login`, data);

  }

  getDezurstva(korisnickoIme){

    const data = {
      "korisnickoIme": korisnickoIme,
    }

    return this.http.post(`${this.uri}/getDezurstva`, data);

  }

  
  getAllNastavnikNames(){

    return this.http.get(`${this.uri}/getAllNastavnikNames`);

  }

  getNastavnikName(korisnickoIme){

    const data = {
      "korisnickoIme": korisnickoIme
    }

    return this.http.post(`${this.uri}/getNastavnikName`, data);

  }

  addZamena(dezurstvoMoje, dezurstvoZeljeno){

    const data = {
      "dezurstvoMoje": dezurstvoMoje,
      "dezurstvoZeljeno": dezurstvoZeljeno
    }

    return this.http.post(`${this.uri}/addZamena`, data);

  }

  getAllZamene(){
    return this.http.get(`${this.uri}/getAllZamene`);
  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/']);

  }


}
