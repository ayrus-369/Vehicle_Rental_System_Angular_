import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  customers: any[] = [];
  constructor(private customerService: CustomerService){
    this.customerService.getAllCustomers.subscribe(
      {
        next:(data: any)=>{
        this.customers=data;
          
        },
        error:(error) =>{
          console.log(error);
        },
        complete:()=>{
          console.log("Server completed sending data.");
        }
      }
    )
  }

}
