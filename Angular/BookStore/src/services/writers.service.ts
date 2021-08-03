import { Injectable } from '@angular/core';
import { Writer } from '../data/writers';
import { allWriters } from '../data/writersData';

@Injectable({
  providedIn: 'root'
})
export class WritersService {

  constructor() { }

  getAllWriters(): Writer[] {
    return allWriters;
  }

  sortWritersByAward(): Writer[]{
    // Pisemo pomocnu funkciju za sort jer on po defaultu sortira abecedno
    return allWriters.sort((a,b)=>{
      return a.awards - b.awards 
    })
  }

  sortWritersByBirthDay(): Writer[]{
    return allWriters.sort((a,b)=>{
      if(a.birthday>b.birthday) return 1;
      else if(a.birthday< b.birthday) return -1;
      else return 0;
    })
  }

}
