import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import {LocalStorageService} from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { ForgotpasswordRequestPayload } from '../forgotpassword/forgotpassword-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8080/api/auth/";

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }



  constructor(private httpClient:HttpClient, private localStorage:LocalStorageService) { 

  }


  signup(signupRequestPayload:SignupRequestPayload):Observable<any>{

    return this.httpClient.post(this.url+"signup",signupRequestPayload,{responseType:'text'});
  }

  login(loginRequestPayload:LoginRequestPayload):Observable<boolean>{

    return this.httpClient.post<LoginResponsePayload>(this.url+"login",loginRequestPayload)
      .pipe(map(data => {
        
        this.localStorage.store('authenticationToken',data.authenticationToken);
        this.localStorage.store('refreshToken',data.refreshToken);
        this.localStorage.store('username',data.username);
        this.localStorage.store('expiresAt',data.expiresAt);
        

        return true;
      }));

  }


  forgotPassword(forgotpasswordRequestPayload:ForgotpasswordRequestPayload):Observable<any>{

    console.log("authservice parola : " +forgotpasswordRequestPayload.mail);
    return this.httpClient.post(this.url+"renewPasswordMail",forgotpasswordRequestPayload,{responseType:'text'});
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
}
