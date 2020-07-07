import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"sign-up",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component:ForgotpasswordComponent},
  {path:"",redirectTo:'home', pathMatch:'full'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
