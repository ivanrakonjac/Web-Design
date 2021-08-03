import { Component, OnInit } from '@angular/core';
import { Writer } from '../data/writers';
import { WritersService } from '../services/writers.service';

@Component({
  selector: 'app-writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements OnInit {

  constructor(private writersService: WritersService) { }

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

}
