import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Logintoaccount } from '../../model/logintoaccount';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { timeout } from 'rxjs';
import { Customer } from '../../model/customer';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent{

  message:String="";
  errorMessage:String="";
  newLogin:Logintoaccount = new Logintoaccount();
  currentCustomer:Customer=new Customer();
  constructor(private authService:AuthService, private router:Router,private appComponent:AppComponent){
  }
  login(){
    this.message="";
    this.errorMessage="";

  this.authService.login(this.newLogin).subscribe({
    next:(data)=>{
    console.log(data);
    this.message="Logged in Successfully!....";
    // timeout(10);
    this.currentCustomer=data;
   
    sessionStorage.setItem("isLoggedIn","true");
    alert("Login Successfull")
    this.router.navigateByUrl("home/" + this.currentCustomer.id);

    },
    error:(err)=>{
    console.log(err);
    //this.message="Error occured While logging in"
    this.errorMessage=err.error
    },
    complete:()=>{
    console.log("Server completed sending data");
    
    }
  })
}
}