import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  uri='http://localhost:4000'

  login(data){
    return this.http.post(`${this.uri}/login`, data);
  }

  getSveDelove(){
    return this.http.get(`${this.uri}/getSveDelove`);
  }

  getLastIdNaloga(){
    return this.http.get(`${this.uri}/getLastIdNaloga`);
  }

  addNalog(data){
    return this.http.post(`${this.uri}/addNalog`, data);
  }

  
  getNalogByServiser(username){

    const data = {
      "serviser": username
    }

    return this.http.post(`${this.uri}/getNalogByServiser`, data);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }


}
