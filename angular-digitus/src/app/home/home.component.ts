import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isAdmin:Boolean;
  isLoggedIn:Boolean;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.admin.subscribe((data: boolean) => this.isAdmin = data);
  }

}
