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

  onlineUsers: string ;
  

  unverificatedUsers: string;
  
  
  verificatedUsers:string;

  averageLoginTime:string;
  


  constructor(private authService: AuthService) { }

  ngOnInit(): void {


    this.refresh();
    
  }


  logged() {

    this.authService.logged().subscribe(data => {

      this.onlineUsers = data;
 
      //console.log("calisti")
    }, error => {
      this.onlineUsers = "Suan erişilemiyor";
      throwError(error);
    });


  }


  unregistered() {

    this.authService.unregisteredUsers().subscribe(data => {
      this.unverificatedUsers = data;

      //alert(data)
      //console.log("unregistered users : " + data);
    }, error => {

      this.unverificatedUsers = "0";
      throwError(error);
    });

  

  }


  activated() {

    this.authService.verificatedUsers().subscribe(data => {
      
      this.verificatedUsers = data;
      //alert(data)
      //console.log("unregistered users : " + data);
    }, error => {

      this.verificatedUsers = "Suan erişilemiyor";
      throwError(error);
    });



  }

  averageTime(){

    this.authService.averageLoginTime().subscribe(data => {
      this.averageLoginTime = data;
      console.log(data);
    },error => {
      console.log("hata");
      throwError(error);
    })
  }


  refresh(){
    this.activated();
    this.unregistered();
    this.logged();
    this.averageTime();
  }



}
