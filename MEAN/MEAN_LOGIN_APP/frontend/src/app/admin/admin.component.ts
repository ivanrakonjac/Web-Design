import { Component, OnInit } from '@angular/core';
import { News } from '../model/news.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.username= localStorage.getItem('user');
    this.getAllNews();
  }

  username: string;

  news: News[];

  getAllNews(){
     this.service.news().subscribe((data: News[])=>{
       this.news = data;
     })
  }

}
