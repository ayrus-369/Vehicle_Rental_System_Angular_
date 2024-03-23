import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  carsAvailable = 0; // Example static value
  carsBooked = 0; // Example static value
  numberOfUsers = 0; // Example static value
  unReturned=0;

  constructor(private vehicleService:VehicleService,private customerService:CustomerService) { 
    this.vehicleService.getUnReturnedVehicles.subscribe({
      next: data => {
        this.unReturned= data.length;
      },
      error: (err: any) => {
        console.log("Error occured", err);
      }
      
    });
    
    this.customerService.getAllCustomers.subscribe({
      next:(data: any)=>{
    
      this.numberOfUsers=data.length;
          
        },
        error:(err: any)=>{
       this.numberOfUsers=0;
        
        
        },
        complete:()=>{
          console.log("Server completed sending data.");
          
        }
    
   
    })
    this.vehicleService.getAllBookedVehicles.subscribe({
      next:(data: any)=>{
        this.carsBooked=data.length;
      },
      error:(err: any)=>{
        this.carsBooked=0;
      },
      complete:()=>{
        console.log("Server completed sending data.");
      }
    });
    
  }


  ngOnInit(): void {
    this.vehicleService.getAllAvailabeVehicles.subscribe({
      next:(data: any)=>{
    
      this.carsAvailable=data.length;
          
        },
        error:(err: any)=>{
          if(err.error=="No Vehicles exist!")
       this.carsAvailable=0;
        
        
        },
        complete:()=>{
          console.log("Server completed sending data.");
          
        }
    
   
    })
    // Here you would fetch the real values, for example, from a service
  }

}
