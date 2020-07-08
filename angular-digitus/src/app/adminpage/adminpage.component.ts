import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { error } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  onlineUsers:string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.logged();
  }


  logged(){

    this.authService.logged().subscribe(data => {

      this.onlineUsers = data;
    },error => {
      this.onlineUsers = "Suan erilemiyor";
      throwError(error);
    })

  }

  
  

}
