import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Writer } from '../data/writers';
import { WritersService } from '../services/writers.service';

@Component({
  selector: 'app-writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements OnInit {

  constructor(private writersService: WritersService, private router: Router) { }

  ngOnInit(): void {
    this.message = "Hello from onInit";
    this.allWriters = this.writersService.getAllWriters();
  }

  message: string;
  allWriters: Writer[];

  sortByAwards(){
    this.allWriters = this.writersService.sortWritersByAward();
  }

  sortByBirthday(){
    this.allWriters = this.writersService.sortWritersByBirthDay();
  }

  about(writer: Writer){
    alert(writer.firstName);
    this.router.navigate(['about']);
  }

}
