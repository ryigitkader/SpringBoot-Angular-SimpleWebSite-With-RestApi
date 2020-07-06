import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import {LocalStorageService} from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8080/api/auth/";

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



}
