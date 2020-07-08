import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/shared/auth.service';
import { RenewpasswordRequestPayload} from  './renewpassword-request.payload';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-renewpassword',
  templateUrl: './renewpassword.component.html',
  styleUrls: ['./renewpassword.component.css']
})
export class RenewpasswordComponent implements OnInit {

  pass:string="";
  confirmpass:string="";
  warnMessage:string="";
  renewPasswordForm : FormGroup;
  renewpasswordRequestPayload:RenewpasswordRequestPayload;

  

  constructor(
    private authService:AuthService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router

    ) {

    this.renewpasswordRequestPayload = {
      password:''
    };

   }

  ngOnInit(): void {

    this.renewPasswordForm = new FormGroup({
      password: new FormControl('',Validators.required),
      confirmpassword: new FormControl('',Validators.required)
    });

  }



  renewPassword(){

    const token:string = this.activatedRoute.snapshot.paramMap.get('token');
    //console.log(token);

    

    this.pass = this.renewPasswordForm.get('password').value;
    this.confirmpass = this.renewPasswordForm.get('confirmpassword').value
      

    //!!CHECK PASSWORDS

      this.renewpasswordRequestPayload.password = this.renewPasswordForm.get('password').value;

      this.authService.renewPassword(token,this.renewpasswordRequestPayload).subscribe(data => {

        this.toastr.success('Password reseted with new password');
        //this.router.navigateByUrl('');
      },error => {

        this.toastr.error('Problem occured! Please try again later');
        throwError(error);
      });

 

  }

    

  }

