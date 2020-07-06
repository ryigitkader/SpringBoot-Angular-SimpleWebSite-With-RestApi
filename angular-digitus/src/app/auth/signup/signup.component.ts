import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    })
  }


  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.name =  this.signupForm.get('name').value;
    this.signupRequestPayload.surname = this.signupForm.get('surname').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;


    this.authService.signup(this.signupRequestPayload)
                    .subscribe(() => {
                     this.router.navigate(['/login'],{queryParams:{registered:true}});
                    }, ()=>{
                       this.toastr.error('Registration Failed');
                    } );
                  
    
  }

}
