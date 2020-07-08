import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import {LocalStorageService} from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { ForgotpasswordRequestPayload } from '../forgotpassword/forgotpassword-request.payload';
import { RenewpasswordRequestPayload } from 'src/app/renewpassword/renewpassword-request.payload';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8080/api/auth/";

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() admin: EventEmitter<boolean> = new EventEmitter();

  

  constructor(private httpClient:HttpClient, private localStorage:LocalStorageService) { 

  }


  signup(signupRequestPayload:SignupRequestPayload):Observable<any>{

    return this.httpClient.post(this.url+"signup",signupRequestPayload,{responseType:'text'});
  }

  adminSignup(signupRequestPayload:SignupRequestPayload):Observable<any>{

    return this.httpClient.post(this.url+"adminSignup",signupRequestPayload,{responseType:'text'});
  }


  login(loginRequestPayload:LoginRequestPayload):Observable<boolean>{

    return this.httpClient.post<LoginResponsePayload>(this.url+"login",loginRequestPayload)
      .pipe(map(data => {
        
        this.localStorage.store('authenticationToken',data.authenticationToken);
        this.localStorage.store('refreshToken',data.refreshToken);
        this.localStorage.store('username',data.username);
        this.localStorage.store('expiresAt',data.expiresAt);
        
  
        console.log("admin data : " + data.admin);

        this.loggedIn.emit(true);

        if(data.admin){
          
          this.localStorage.store('admin',data.admin);
          this.admin.emit(true)
       
        }else{
          
          this.admin.emit(false)
        }

        return true;
      }));

  }


  forgotPassword(forgotpasswordRequestPayload:ForgotpasswordRequestPayload):Observable<any>{

    //console.log("authservice parola : " +forgotpasswordRequestPayload.mail);
    return this.httpClient.post(this.url+"renewPasswordMail",forgotpasswordRequestPayload,{responseType:'text'});
  }


  renewPassword(token:string,renewpasswordRequestPayload:RenewpasswordRequestPayload):Observable<any>{

    return this.httpClient.post(this.url+"renewPassword/"+token,renewpasswordRequestPayload,{responseType:'text'});
  }


  logout(){
    
    this.httpClient.post(this.url+"logout",this.refreshTokenPayload,
    {responseType:'text'}).subscribe(data =>{
      console.log(data);
    },error =>{
      throwError(error);
    });

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('admin');
    

  }


  logged():Observable<any>{
    
    return this.httpClient.get(this.url+"logged",{responseType:'text'});
  }


  unregisteredUsers():Observable<any>{

    return this.httpClient.get(this.url+"notactivateuser",{responseType:'text'});
  }


  
  getJwtToken(){

    return this.localStorage.retrieve('authenticationToken');
  }



  refreshToken() {
    return this.httpClient.post<LoginResponsePayload>(this.url+'refresh/token', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }





  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }


  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  isAdmin():boolean{

  
    return this.localStorage.retrieve('admin') != null;
  }
}
