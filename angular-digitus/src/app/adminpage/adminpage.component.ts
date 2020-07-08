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

  onlineUsers: string;
  unverificatedUsers: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.logged();
    this.unregistered();
  }


  logged() {

    this.authService.logged().subscribe(data => {

      this.onlineUsers = data;
      //console.log("calisti")
    }, error => {
      this.onlineUsers = "Suan erişilemiyor";
      throwError(error);
    });

    setTimeout(() => {

      this.logged();
      

    }, 100);


  }


  unregistered() {

    this.authService.unregisteredUsers().subscribe(data => {
      this.unverificatedUsers = data;
      //alert(data)
      //console.log("unregistered users : " + data);
    }, error => {

      this.unverificatedUsers = "Suan erişilemiyor";
      throwError(error);
    });

    setTimeout(() => {

      this.unregistered();
      

    }, 100);
    

  }




}
