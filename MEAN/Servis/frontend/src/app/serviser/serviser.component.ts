import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { Deo } from 'src/model/deo';
import { UserService } from 'src/services/user.service';
import { Nalog } from 'src/model/nalog';

@Component({
  selector: 'app-serviser',
  templateUrl: './serviser.component.html',
  styleUrls: ['./serviser.component.css']
})
export class ServiserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User;
  delovi: Deo[];
  imeNaloga: string;
  izabraniDeo: string;
  noviDeo: string;
  lastIdNaloga: number;
  nalozi: Nalog[];

  stanja: string[] = ["novi", "u obradi", "gotovo"];
  izabranoStanje: string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    
    this.userService.getSveDelove().subscribe((delovi: Deo[]) =>{
      this.delovi = delovi;
    })

    this.userService.getLastIdNaloga().subscribe((nalog: Nalog) =>{
      console.log(nalog);
      this.lastIdNaloga = nalog.id;
    })

    this.userService.getNalogByServiser(this.user.kor_ime).subscribe((nalozi: Nalog[])=>{
      if(nalozi){
        this.nalozi = nalozi;
        console.log(this.nalozi);
      }else{
        alert('Ne mogu dovuci naloge');
      }
    })
  }

  zavrsi(){
    console.log(this.imeNaloga);
    
    if(this.izabraniDeo!='nema'){
      console.log(this.izabraniDeo);
    }else{
      this.izabraniDeo = this.noviDeo;
      console.log(this.noviDeo);
    }

    const newNalog = {
      "id": this.lastIdNaloga + 1,
      "serviser": this.user.kor_ime,
      "naziv": this.imeNaloga,
      "deo": this.izabraniDeo,
      "status": "novi"
    }

    this.userService.addNalog(newNalog).subscribe((res: any)=> {
      if(res.status!='ok'){
          alert("Something went wrong!");
      }
      this.router.navigate(['serviser']);
    })

    console.log(this.lastIdNaloga);
  }

  onChange(event, nalog){
    console.log(event);
    console.log(nalog);
  }

  logout(){
    this.userService.logout();
  }

}
