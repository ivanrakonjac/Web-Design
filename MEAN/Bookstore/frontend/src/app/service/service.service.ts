import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // Adresa gde je nas backend
  uri = 'http://localhost:4001';


  constructor(private http: HttpClient) { }
}
