import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inspektor',
  templateUrl: './inspektor.component.html',
  styleUrls: ['./inspektor.component.css']
})
export class InspektorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

}
