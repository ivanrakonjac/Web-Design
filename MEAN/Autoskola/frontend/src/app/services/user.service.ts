import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  uri = 'http://localhost:4000'

  login(username, password){

    const data = {
      "username": username,
      "password": password
    }

    return this.http.post(`${this.uri}/login`, data);

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  prijavaZaUsername(username){

    const data = {
      "username": username
    }

    return this.http.post(`${this.uri}/prijavaZaUsername`, data);
  }

  
  polaganjeZaIdPrijave(idPrijave){

    const data = {
      "idPrijave": idPrijave
    }

    return this.http.post(`${this.uri}/polaganjeZaIdPrijave`, data);
  }
}
