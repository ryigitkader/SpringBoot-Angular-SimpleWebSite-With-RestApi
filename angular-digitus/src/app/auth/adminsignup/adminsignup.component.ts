import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';




@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {


  signupRequestPayload:SignupRequestPayload;
  signupForm:FormGroup;

  constructor(

    private authService:AuthService,
    private router:Router, 
    private toastr:ToastrService

  ) { 

    this.signupRequestPayload = {
      email: '',
      username: '',
      name: '',
      surname: '',
      password: ''
  
    };

  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      name:new FormControl('',[Validators.required]),
      surname:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }



  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.name =  this.signupForm.get('name').value;
    this.signupRequestPayload.surname = this.signupForm.get('surname').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;


    this.authService.adminSignup(this.signupRequestPayload)
                    .subscribe(data => {
                     this.toastr.success("Registration successfull"); 
                     this.router.navigate(['/login'],
                     {queryParams:{registered:true}});
                    }, error => {
                      console.log('Registration Failed')
                       this.toastr.error('Registration Failed, use different credentials');
                    } );
                  
    
  }

}
