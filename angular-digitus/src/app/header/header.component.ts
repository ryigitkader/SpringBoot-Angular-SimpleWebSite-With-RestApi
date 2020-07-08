import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin:Boolean;
  isLoggedIn:Boolean;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.admin.subscribe((data: boolean) => this.isAdmin = data);
    this.isAdmin =  this.authService.isAdmin();

  }


  logout(){
    this.isLoggedIn=false;
    this.isAdmin = false;
    this.router.navigateByUrl("");
    this.authService.logout();
    //window.location.reload();
  }


  logged(){

    this.authService.logged().subscribe(data => {

      console.log("logged: "+data);
    },error => {
      console.log("hata logged");
      throwError(error);
    })
  }
}
