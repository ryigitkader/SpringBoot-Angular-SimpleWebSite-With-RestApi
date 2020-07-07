import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotpasswordRequestPayload } from './forgotpassword-request.payload'
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  forgotPasswordForm : FormGroup;
  forgotpasswordRequestPayload:ForgotpasswordRequestPayload;
  constructor(private authService:AuthService,private toastr:ToastrService) {

    this.forgotpasswordRequestPayload = {
      mail:''
    };

   }

  ngOnInit(): void {

    
    this.forgotPasswordForm = new FormGroup({
      mail: new FormControl('',Validators.required)
    });


  }


  forgotPassword(){

    this.forgotpasswordRequestPayload.mail = this.forgotPasswordForm.get('mail').value;
    //console.log(this.forgotpasswordRequestPayload.email)
    this.authService.forgotPassword(this.forgotpasswordRequestPayload).subscribe(data => {
      console.log("success")
      this.toastr.success('Reset password mail sent, if there is a email like that');
    },error =>{
      this.toastr.error('Mail is not found');
      throwError(error);
    });

  }

}
