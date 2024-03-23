import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit{
  id:string | null = "";
  customer:Customer = new Customer();
  message:string="";
  errorMessage:string="";
  
  constructor(private activatedRoute: ActivatedRoute,private authService:AuthService)
  {
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  console.log("inside update:"+this.id);
 
  }
  ngOnInit(): void {
    let numericValue: number = Number(this.id || '0');
    this.authService.getAccountById(numericValue).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.customer=data;

        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.message;
          // this.customer=undefined;
        }
      }
    )
  }
  updateCustomer(){
    console.log(this.customer);
    this.authService.update(this.customer).subscribe(
      {
        next: (data) => {
          console.log(data);
         this.message="Customer Updated.";

        },
        error: (err) => {
          console.log(err);
          if(err.name == "HttpErrorResponse")
          this.errorMessage =" Network error, please try again later."
          else
          this.errorMessage = err.error;
        }
      }
    )
  }
}
