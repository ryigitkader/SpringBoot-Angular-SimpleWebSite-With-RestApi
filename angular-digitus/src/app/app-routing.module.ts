import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { RenewpasswordComponent } from './renewpassword/renewpassword.component';
import { AdminsignupComponent } from './auth/adminsignup/adminsignup.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AuthGuard} from './auth/auth.guard';
import {  CheckGuard } from './auth/check.guard';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"sign-up",component:SignupComponent,canActivate:[CheckGuard]},
  {path:"login",component:LoginComponent,canActivate:[CheckGuard]},
  {path:"forgot-password",component:ForgotpasswordComponent},
  {path:"admin-signup",component:AdminsignupComponent,canActivate:[CheckGuard]},
  {path:"adminpage",component:AdminpageComponent,canActivate:[AuthGuard]},
  {path:"",redirectTo:'home', pathMatch:'full'},
  {path:"renew-password/:token",component:RenewpasswordComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
