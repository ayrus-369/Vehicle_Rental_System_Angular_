import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent{ 
    message:String="";
  errorMessage:String="";
  cpassword:String="";
  customer:Customer = new Customer();
  constructor(private authService:AuthService){
}
        register(){
            this.message="";
    this.errorMessage="";

  this.authService.register(this.customer).subscribe({
    next:(data)=>{
    console.log(data);
    this.message="Registered Successfully!....";
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

