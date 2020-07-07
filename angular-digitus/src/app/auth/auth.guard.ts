import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAdmin: boolean;

  constructor(private authService:AuthService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      

      const isAuthenticated = this.authService.isLoggedIn();

      
      this.authService.admin.subscribe((data: boolean) => this.isAdmin = data);
      
      if(isAuthenticated && this.isAdmin){
        return true;
      }else{
        this.router.navigateByUrl('');
      }

      return true;
    
  }
  
}
